module.exports = {
  up: async ({ update, call }) => {
    await call('activitypub.follow.updateCollectionsOptions');
    await call('activitypub.inbox.updateCollectionsOptions');
    await call('activitypub.outbox.updateCollectionsOptions');
    await call('activitypub.like.updateCollectionsOptions');
    await call('activitypub.reply.updateCollectionsOptions');

    const collectionsContainerUri = await call('activitypub.collection.getContainerUri');

    console.info(`Attaching all collections to ${collectionsContainerUri}`);

    await update({
      query: `
        PREFIX as: <https://www.w3.org/ns/activitystreams#>
        PREFIX ldp: <http://www.w3.org/ns/ldp#>
        INSERT {
          <${collectionsContainerUri}> ldp:contains ?collectionUri
        }
        WHERE {
          ?collectionUri a as:Collection
        }
      `,
      webId: 'system'
    });
  },

  down: async () => {
    // No down migration
  },
};
