module.exports = {
  up: async ({ query, insert, update, call }) => {
//    await call('migration.replacePredicate', { oldPredicate: 'as:image', newPredicate:'pair:pictedBy', dataset: 'localData' });

    const oldPredicate = 'https://www.w3.org/ns/activitystreams#image';
    const newPredicate = 'http://virtual-assembly.org/ontologies/pair#depictedBy';

    console.log(`Replacing predicate ${oldPredicate} with ${newPredicate}...`);

    await update({
      query:  `
        DELETE { ?s <${oldPredicate}> ?o . }
        INSERT { ?s <${newPredicate}> ?o . }
        WHERE { ?s <${oldPredicate}> ?o . }
      `,
      dataset: 'localData',
      webId: 'system'
    });

  },
  down: async ({ query, insert, update, call }) => {

    const oldPredicate = 'http://virtual-assembly.org/ontologies/pair#depictedBy';
    const newPredicate = 'https://www.w3.org/ns/activitystreams#image';

    console.log(`Replacing predicate ${oldPredicate} with ${newPredicate}...`);

    await update({
      query:  `
        DELETE { ?s <${oldPredicate}> ?o . }
        INSERT { ?s <${newPredicate}> ?o . }
        WHERE { ?s <${oldPredicate}> ?o . }
      `,
      dataset: 'localData',
      webId: 'system'
    });
  },
};
