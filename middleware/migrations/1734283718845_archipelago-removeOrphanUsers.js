module.exports = {
  up: async ({ query, insert, update, call }) => {

    const activeUsers = await query({
      query: `
        SELECT ?s
        WHERE {
          ?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://virtual-assembly.org/ontologies/pair#Person>
        }
      `,
      webId: 'system',
    });

    const webIds = activeUsers.map(user => `"${user.s.value}"`);

    await update({
      query: `
        DELETE {
          ?subject ?predicate ?object .
        } WHERE {
          ?subject ?predicate ?object .
          ?subject <http://semapps.org/ns/core#webId> ?webid .
          FILTER(?webid NOT IN (${webIds.join(',')}))
        }
      `,
      dataset: 'settings',
    });
  },
  down: async ({ query, insert, update, call }) => {
    // No down migration
  },
};
