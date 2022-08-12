const urlJoin = require('url-join');
const CONFIG = require('../../config/config');
const { getSlugByUrl } = require('../utils/utils');

const SpaceManagerMixin = {
  created() {
    this.humhubSpaces = [];
  },
  methods: {
    async prepare() {
      this.humhubSpaces = await this.broker.call('importer.humhub.space.list');
      for (const key of this.humhubSpaces.keys()) {
        if (this.humhubSpaces[key].id === 18) {
          // Link "Salle commune" to main circle
          this.humhubSpaces[key].circleUri = urlJoin(CONFIG.HOME_URL, 'circles', 'jardiniers-du-nous');
        } else {
          this.humhubSpaces[key].circleUri = urlJoin(CONFIG.HOME_URL, 'circles', getSlugByUrl(this.humhubSpaces[key].url));
        }
      }
    },
    getSpaceByUrl(url) {
      return url && this.humhubSpaces.find(s => s.url === url);
    },
    getSpaceByContainerId(id) {
      return id && this.humhubSpaces.find(s => s.contentcontainer_id === id);
    }
  }
};

module.exports = SpaceManagerMixin;
