const urlJoin = require('url-join');
const CONFIG = require('../config/config');

module.exports = {
  name: 'importer.all',
  actions: {
    async freshImport(ctx) {
      await ctx.call('importer.humhub.user.freshImport');
      await ctx.call('importer.top-circles.freshImport');
      await ctx.call('importer.wiki.jardins-locaux.freshImport');
      await ctx.call('importer.wiki.jardins-thematiques.freshImport', { clear: false });
      await ctx.call('importer.humhub.calendar.freshImport');
      await ctx.call('importer.humhub.post.freshImport');
    },
    async clear(ctx) {
      await ctx.call('ldp.container.clear', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'users'),
        webId: 'system'
      });

      await ctx.call('ldp.container.clear', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'documents'),
        webId: 'system'
      });

      await ctx.call('ldp.container.clear', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'events'),
        webId: 'system'
      });

      await ctx.call('ldp.container.clear', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'circles'),
        webId: 'system'
      });

      await ctx.call('ldp.container.clear', {
        containerUri: urlJoin(CONFIG.HOME_URL, 'themes'),
        webId: 'system'
      });
    }
  }
};
