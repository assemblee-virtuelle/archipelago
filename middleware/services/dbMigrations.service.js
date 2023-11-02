const fs = require("fs");
const path = require("path");
const CONFIG = require("../config/config");

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const GRAY = '\x1b[90m';
const DEFAULT = '\x1b[0m';

const MIGRATION_FILE_TEMPLATE = `module.exports = {
  up: async ({ query, insert, update }) => {
    /*
     * You can use 'query', 'insert' and 'update' actions from triplestore service
     * Documentation for these methods can be found here: https://semapps.org/docs/middleware/triplestore
     * Example:
     *
     * const queryResult = await query({
     *   query: \`
     *     SELECT ?s ?p ?o
     *     WHERE {
     *       ?subject ?predicate ?object
     *     }
     *   \`,
     * });
     */

  },
  down: async ({ query, insert, update }) => {
    /*
     * This function must undo what is done in the above "up" function.
     * If things are not undoable, it must ensure that the database will be in a coherent working state
     */

  },
};
`;

module.exports = {
  name: "dbMigrations",
  settings: {
    migrationsFolder: path.join(__dirname, "../migrations"),
    dataset: 'settings',
    baseUrl: CONFIG.HOME_URL,
  },

  methods: {
    logInfo(text) {
      console.log(`${GRAY}${text}${DEFAULT}`);
    },

    logSuccess(text) {
      console.log(`${GREEN}${text}${DEFAULT}`);
    },

    logWarn(text) {
      console.log(`${YELLOW}${text}${DEFAULT}`);
    },

    logError(text) {
      console.log(`${RED}${text}${DEFAULT}`);
    },

    /**
     * Lists files and in-database migrations found and merges them
     * @returns {{ name: string, appliedDate: string, onlyDb: boolean }[]}
     */
    async listMigrations() {
      const migrations = fs
        .readdirSync(this.settings.migrationsFolder)
        .filter((file) => /\d+_.*\.js/.test(file))
        .map((file) => ({
          name: file.substring(0, file.lastIndexOf(".")), // Strip extension
          appliedDate: null,
          onlyDb: false,
        }));

      const databaseMigrations = await this.broker.call("triplestore.query", {
        dataset: this.settings.dataset,
        query: `
          SELECT ?name ?appliedDate
          WHERE {
            ?name <http://purl.org/dc/terms/created> ?appliedDate
          }
        `,
      });

      const resourceUri = new URL("migrations/", this.settings.baseUrl).href;

      databaseMigrations.forEach((migration) => {
        const name = migration.name.value.substring(resourceUri.length);
        const index = migrations.findIndex(
          (localMigration) => localMigration.name === name
        );

        if (index > -1) {
          migrations[index].appliedDate = migration.appliedDate.value;
        } else {
          migrations.push({
            name,
            appliedDate: migration.appliedDate.value,
            onlyDb: true,
          });
        }
      });

      migrations.sort((a, b) => (a.name < b.name ? -1 : 1));
      return migrations;
    },

    /**
     * Applies a selected migration and saves it in db
     * @param {{ name: string, appliedDate: string, onlyDb: boolean }} currentMigration
     * @returns {boolean} True if successful, false otherwise
     */
    async internalUp(currentMigration) {
      try {
        this.logInfo(`Applying migration "${currentMigration.name}"...`);

        const migrationFile = require(path.join(
          this.settings.migrationsFolder,
          `${currentMigration.name}.js`
        ));
        await migrationFile.up({
          query: (opts) => this.broker.call('triplestore.query', opts),
          insert: (opts) => this.broker.call('triplestore.insert', opts),
          update: (opts) => this.broker.call('triplestore.update', opts),
        });

        const resourceUri = new URL(
          `migrations/${currentMigration.name}`,
          this.settings.baseUrl
        ).href;
        await this.broker.call("triplestore.insert", {
          dataset: this.settings.dataset,
          resource: `<${resourceUri}> <http://purl.org/dc/terms/created> "${new Date().toISOString()}"`,
        });

        this.logSuccess(
          `Migration "${currentMigration.name}" is successfully applied.`
        );
        return true;
      } catch (e) {
        this.logError(e.message);
        this.logError(
          `An error occurred during migration "${currentMigration.name}". Migration is not applied.`
        );
        return false;
      }
    },

    /**
     * Rollbacks a selected migration and deletes it from db
     * @param {{ name: string, appliedDate: string, onlyDb: boolean }} currentMigration
     * @param {boolean} force
     * @returns {boolean} True if successful, false otherwise
     */
    async internalDown(currentMigration, force) {
      try {
        this.logInfo(`Rollbacking migration "${currentMigration.name}"...${DEFAULT}`);

        if (currentMigration.onlyDb && !force) {
          throw new Error(
            `Migration "${currentMigration.name}" was only found in database, and unknown locally. You can use "--force" parameter to delete it`
          );
        }

        if (!currentMigration.onlyDb) {
          const migrationFile = require(path.join(
            this.settings.migrationsFolder,
            `${currentMigration.name}.js`
          ));
          await migrationFile.down({
            query: (opts) => this.broker.call('triplestore.query', opts),
            insert: (opts) => this.broker.call('triplestore.insert', opts),
            update: (opts) => this.broker.call('triplestore.update', opts),
          });
        }

        const resourceUri = new URL(
          `migrations/${currentMigration.name}`,
          this.settings.baseUrl
        ).href;
        await this.broker.call("triplestore.update", {
          dataset: this.settings.dataset,
          query: `
            DELETE { <${resourceUri}> ?p ?o }
            WHERE { <${resourceUri}> ?p ?o }
          `,
        });

        if (currentMigration.onlyDb) {
          this.logWarn(
            `Migration "${currentMigration.name}" is successfully deleted in database. No rollback done`
          );
        } else {
          this.logSuccess(
            `Migration "${currentMigration.name}" is successfully rollbacked.`
          );
        }
        return true;
      } catch (e) {
        this.logError(e.message);
        this.logError(
          `An error occurred when rollbacking migration "${currentMigration.name}". Migration is not rollbacked.`
        );
        return false;
      }
    },
  },

  actions: {
    create: {
      params: {
        name: "string",
      },
      async handler(ctx) {
        try {
          const fileName = `${Date.now()}_${ctx.params.name}.js`;
          fs.writeFileSync(
            path.join(this.settings.migrationsFolder, fileName),
            MIGRATION_FILE_TEMPLATE
          );
          this.logSuccess(`New migration ${fileName} successfully created`);
          return true;
        } catch (e) {
          this.logError(`An error occurred during migration creation: ${e.message}`);
          return false;
        }
      },
    },

    async status() {
      const migrations = await this.listMigrations();

      console.table(
        migrations.map((migration) => ({
          name: migration.name,
          status: migration.onlyDb
            ? "Unknown migration applied"
            : migration.appliedDate
            ? "Applied"
            : "Not applied",
          "applied date": migration.appliedDate || "-",
        }))
      );
      return true;
    },

    up: {
      params: {
        name: {
          type: "string",
          optional: true,
        },
        latest: {
          type: "boolean",
          optional: true,
        },
      },
      async handler(ctx) {
        const migrations = await this.listMigrations();

        // Run for a named migration
        if (ctx.params.name) {
          const paramName = ctx.params.name.replace(/\.js$/, "");
          const currentMigration = migrations.find(
            (migration) => migration.name === paramName
          );

          if (!currentMigration) {
            this.logError(`No migration found with name "${paramName}"`);
            return false;
          } else if (currentMigration.appliedDate) {
            this.logWarn(
              `Migration "${paramName}" is already applied. Nothing to do.`
            );
            return true;
          }

          if (ctx.params.latest) {
            this.logInfo('Param --latest is ignored when a named migration is given');
          }

          return await this.internalUp(currentMigration);
        }

        const notAppliedMigrations = migrations.filter(
          (migration) => !migration.appliedDate
        );

        if (notAppliedMigrations.length === 0) {
          this.logWarn(
            `All found migrations are already applied. Nothing to do.`
          );
          return true;
        }

        // Run all not applied migrations
        if (ctx.params.latest) {
          let success = true;
          for (let currentMigration of notAppliedMigrations) {
            if (success) {
              success = await this.internalUp(currentMigration);
            } else {
              this.logInfo(
                `Due to previous failure, migration "${currentMigration.name}" is not applied.`
              );
            }
          }
          return success;
        } else {
          // Run next not applied migration
          return await this.internalUp(notAppliedMigrations[0]);
        }
      },
    },

    down: {
      params: {
        name: {
          type: "string",
          optional: true,
        },
        earliest: {
          type: "boolean",
          optional: true,
        },
        force: {
          type: "boolean",
          optional: true,
        },
      },
      async handler(ctx) {
        const migrations = await this.listMigrations();

        // Run down for a named migration
        if (ctx.params.name) {
          const paramName = ctx.params.name.replace(/\.js$/, "");
          const currentMigration = migrations.find(
            (migration) => migration.name === paramName
          );

          if (!currentMigration) {
            this.logError(`No migration found with name "${paramName}"`);
            return false;
          } else if (!currentMigration.appliedDate) {
            this.logWarn(
              `Migration "${paramName}" is already not applied. Nothing to do.`
            );
            return true;
          }

          if (ctx.params.earliest) {
            this.logInfo('Param --earliest is ignored when a named migration is given');
          }

          return await this.internalDown(
            currentMigration,
            ctx.params.force || false
          );
        }

        const appliedMigrations = migrations
          .filter((migration) => migration.appliedDate !== null)
          .reverse();

        if (appliedMigrations.length === 0) {
          this.logWarn(
            `None of found migrations is already applied. Nothing to do.`
          );
          return true;
        }

        // Run down all applied migrations in reverse
        if (ctx.params.earliest) {
          let success = true;
          for (let currentMigration of appliedMigrations) {
            if (success) {
              success = await this.internalDown(
                currentMigration,
                ctx.params.force || false
              );
            } else {
              this.logInfo(
                `Due to previous failure, migration "${currentMigration.name}" is not rollbacked.`
              );
            }
          }
          return success;
        } else {
          // Run previous applied migration
          return await this.internalDown(
            appliedMigrations[0],
            ctx.params.force || false
          );
        }
      },
    },

    clear: {
      params: {
        yes: {
          type: 'boolean',
          optional: true
        }
      },
      async handler(ctx) {
        if (!ctx.params.yes) {
          this.logWarn('WARNING: This command will drop migration graph in database without rollbacking migrations');
          this.logWarn('If you want to rollback all migrations, use "down --earliest" instead');
          this.logWarn('Please relaunch this command with --yes parameter to execute it');
          return true;
        } else {
          try {
            await this.broker.call("triplestore.update", {
              dataset: this.settings.dataset,
              query: `
                DELETE { ?s ?p ?o }
                WHERE {
                  ?s ?p ?o .
                  FILTER(regex(str(?s), "/migrations/" ) )
                }
              `,
            });
            this.logSuccess('Migration graph successfully deleted');
            return true;
          } catch (e) {
            this.logError(`An error occurred: ${e.message}`);
            return false;
          }
        }
      }
    }
  },
};
