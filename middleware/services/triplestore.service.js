const { TripleStoreService } = require('@semapps/triplestore');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [TripleStoreService],
  settings: {
    sparqlEndpoint: CONFIG.SPARQL_ENDPOINT,
    mainDataset: CONFIG.MAIN_DATASET,
    jenaUser: CONFIG.JENA_USER,
    jenaPassword: CONFIG.JENA_PASSWORD
  }
};
