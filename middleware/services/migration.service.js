const urlJoin = require('url-join');
const { MIME_TYPES } = require('@semapps/mime-types');
const containers = require('../config/containers');
const CONFIG = require('../config/config');

module.exports = {
  name: 'migration',
  dependencies: ['ldp', 'webacl'],
  actions: {
    async addRightsToAll(ctx) {
      for (let containerConfig of containers) {
        const container = await ctx.call(
          'ldp.container.get',
          {
            containerUri: urlJoin(CONFIG.HOME_URL, containerConfig.path),
            accept: MIME_TYPES.JSON
          },
          {
            meta: { webId: 'system' }
          }
        );

        console.log('Adding rights for container', container);

        await ctx.call('webacl.resource.addRights', {
          webId: 'system',
          resourceUri: container.id,
          additionalRights: {
            anon: {
              read: true
            },
            anyUser: {
              read: true,
              write: true
            }
          }
        });

        if (container['ldp:contains'] && container['ldp:contains'].length > 0) {
          for (let resource of container['ldp:contains']) {
            if (resource && Object.keys(resource).length > 0) {
              console.log('Adding rights for resource ' + resource.id);

              if (containerConfig.path === '/users') {
                await ctx.call('webacl.resource.addRights', {
                  webId: 'system',
                  resourceUri: resource.id,
                  additionalRights: {
                    anon: {
                      read: true
                    },
                    user: {
                      uri: resource.id,
                      read: true,
                      write: true,
                      control: true
                    }
                  }
                });
              } else {
                await ctx.call('webacl.resource.addRights', {
                  webId: 'system',
                  resourceUri: resource.id,
                  additionalRights: {
                    anon: {
                      read: true
                    },
                    anyUser: {
                      read: true,
                      write: true
                    }
                  }
                });
              }
            }
          }
        }
      }
    },
    async migrateUsersToAccounts(ctx) {
      const { usersContainer, emailPredicate, usernamePredicate } = ctx.params;

      const results = await ctx.call('ldp.container.get', { containerUri: usersContainer, accept: MIME_TYPES.JSON });

      for (let user of results['ldp:contains']) {
        if (user[emailPredicate]) {
          try {
            await ctx.call('auth.account.create', {
              email: user[emailPredicate],
              username: user[usernamePredicate],
              webId: user.id
            });
          } catch (e) {
            console.log(`Unable to create account for user ${user.id}. Error message: ${e.message}`);
          }
        } else {
          console.log('No email found for user ' + user.id);
        }
      }
    }
  }
};
