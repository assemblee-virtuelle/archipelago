const urlJoin = require("url-join");
const { ActivityPubService, ACTOR_TYPES } = require('@semapps/activitypub');
const containers = require('../config/containers');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [ActivityPubService],
  settings: {
    baseUri: CONFIG.HOME_URL,
    jsonContext: urlJoin(CONFIG.HOME_URL, 'context.json'),
    containers
  }
};
