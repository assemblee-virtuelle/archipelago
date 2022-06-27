const { LdpService, DocumentTaggerMixin } = require('@semapps/ldp');
const urlJoin = require('url-join');
const ontologies = require('../config/ontologies.json');
const CONFIG = require('../config/config');
const containers = require('../config/containers');

module.exports = {
  mixins: [LdpService, DocumentTaggerMixin],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    ontologies,
    containers,
    preferredViewForResource: async (resourceUri, containerPreferredView) => {
      if (!containerPreferredView) return resourceUri;
      return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
    },
    defaultContainerOptions: {
      jsonContext: urlJoin(CONFIG.HOME_URL, 'context.json')
    }
  }
};
