const { WebAclService } = require('@semapps/webacl');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [WebAclService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    superAdmins: [
      // CONFIG.HOME_URL + 'users/joe'
    ]
  }
};
