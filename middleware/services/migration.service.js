const urlJoin = require('url-join');
const CONFIG = require('../config/config');
const { MIME_TYPES } = require("@semapps/mime-types");

module.exports = {
  name: 'migration',
  actions: {
    async splitUsersAndProfiles(ctx) {
      const usersUris = await ctx.call('ldp.container.getUris', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'users'),
      });
      for (let userUri of usersUris) {
        const user = await ctx.call('ldp.resource.get', {
          resourceUri: userUri,
          accept: MIME_TYPES.JSON,
          webId: 'system'
        });

        const predicatesToKeep = ['id', 'foaf:nick', 'dc:created', 'dc:modified', 'followers', 'following', 'liked', 'inbox', 'outbox', 'publicKey'];

        const newUser = {
          type: 'foaf:Person',
        }

      }
    }
  }
}

