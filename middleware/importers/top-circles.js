const urlJoin = require("url-join");
const path = require("path");
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../config/config');

module.exports = {
  name: 'importer.top-circles',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, './files/top-circles.json'),
      fieldsMapping: {
        slug: 'slug'
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'circles')
    }
  },
  methods: {
    async transform(data) {
      return ({
        type: 'og:Circle',
        'pair:label': data['pair:label'],
        'pair:partOf': data['pair:partOf'] ? urlJoin(CONFIG.HOME_URL, 'circles', data['pair:partOf']) : undefined
      });
    }
  }
};
