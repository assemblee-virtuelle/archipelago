const path = require('path');
const urlJoin = require("url-join");
const { CoreService } = require('@semapps/core');
const { pair, semapps, og, as } = require('@semapps/ontologies');
const CONFIG = require('../config/config');
const containers = require('../config/containers');

module.exports = {
  mixins: [CoreService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    baseDir: path.resolve(__dirname, '..'),
    triplestore: {
      url: CONFIG.SPARQL_ENDPOINT,
      user: CONFIG.JENA_USER,
      password: CONFIG.JENA_PASSWORD,
      mainDataset: CONFIG.MAIN_DATASET,
      fusekiBase: CONFIG.SEMAPPS_FUSEKI_BASE,
    },
    ontologies: [pair, semapps, og, as],
    containers,
    // Sub-services settings
    activitypub: {
      activitiesPath: "/activities"
    },
    api: {
      port: CONFIG.PORT,
    },
    ldp: {
      preferredViewForResource: async (resourceUri, containerPreferredView) => {
        if (!containerPreferredView) return resourceUri;
        return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
      }
    },
    void: {
      title: CONFIG.INSTANCE_NAME,
      description: CONFIG.INSTANCE_DESCRIPTION
    },
    webacl: {
      superAdmins: CONFIG.SUPER_ADMINS ? CONFIG.SUPER_ADMINS.split(',') : [],
    },
    sparqlEndpoint: false,
    webid: {
      path: 'users',
    },
  }
};
