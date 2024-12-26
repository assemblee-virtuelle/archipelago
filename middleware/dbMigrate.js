const { Command } = require('commander');
const { ServiceBroker } = require('moleculer');
const { CoreService } = require('@semapps/core');
const CONFIG = require('./config/config');
const dbMigrationsService = require('./services/dbMigrations.service');
const archipelagoCore = require('./services/core.service');
const authService = require('./services/auth.service');

const broker = new ServiceBroker({
  logLevel: "warn",
});

// Minimal core services to run triplestore queries
broker.createService({
  name: 'core',
  mixins: [CoreService],
  settings: {
    ...archipelagoCore.settings,
    api: {
      port: CONFIG.PORT + 1,
    },
    sparqlEndpoint: false,
    void: false,
    webacl: false,
    webfinger: false,
  }});

broker.createService(authService);
broker.createService(dbMigrationsService);

const executeAction = async (action, options) => {
  await broker.start();
  await broker.call(`dbMigrations.${action}`, options);
  await broker.stop();
}

const program = new Command();
program
  .name('dbMigrate')
  .description('CLI to run Triplestore migrations');

program.command('create')
  .description('Creates a new migration file')
  .option('--name <string>', 'Migration name')
  .action(async (options) => await executeAction('create', options));

program.command('status')
  .description('Lists all migrations and their status and applied date if any')
  .action(async (options) => await executeAction('status', options));

program.command('up')
  .description('Applies given migrations')
  .option('--name <string>', 'Migration name')
  .option('--latest', 'Runs all not applied migrations')
  .action(async (options) => await executeAction('up', options));

program.command('down')
  .description('Rollbacks given migrations')
  .option('--name <string>', 'Migration name')
  .option('--earliest', 'Rollbacks all applied migrations')
  .option('--force', 'Deletes also unknown migrations in database')
  .action(async (options) => await executeAction('down', options));

program.command('clear')
  .description('Clears all migration data in database')
  .option('--yes', 'Effectively executes the command')
  .action(async (options) => await executeAction('clear', options));

program.parse();
