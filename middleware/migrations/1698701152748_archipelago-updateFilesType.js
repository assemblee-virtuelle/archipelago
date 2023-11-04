module.exports = {
  // Since middleware-0.6.0-alpha-1, type attribute for file resource
  // has changed from <semapps:File> to <http://semapps.org/ns/core#File>

  up: async ({ update }) => {
    await update({
      query: `
        DELETE { ?s ?p <semapps:File> . }
        INSERT { ?s ?p <http://semapps.org/ns/core#File> . }
        WHERE { ?s ?p <semapps:File> . }
      `,
      webId: 'system'
    });
  },
  down: async ({ update }) => {
    await update({
      query: `
        DELETE { ?s ?p <http://semapps.org/ns/core#File> . }
        INSERT { ?s ?p <semapps:File> . }
        WHERE { ?s ?p <http://semapps.org/ns/core#File> . }
      `,
      webId: 'system'
    });
  },
};
