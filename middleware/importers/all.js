module.exports = {
  name: 'importer.all',
  actions: {
    async freshImport(ctx) {
      await ctx.call('importer.humhub.user.freshImport');
      await ctx.call('importer.top-circles.freshImport');
      await ctx.call('importer.wiki.jardins-locaux.freshImport');
      await ctx.call('importer.wiki.jardins-thematiques.freshImport', { clear: false });
      await ctx.call('importer.humhub.calendar.freshImport');
    }
  }
};
