const { MirrorService } = require('@semapps/mirror/service');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [MirrorService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
  }
};
