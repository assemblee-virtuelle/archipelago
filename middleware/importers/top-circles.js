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
      containerUri: urlJoin(CONFIG.HOME_URL, 'circles'),
      predicatesToKeep: ['pair:documentedBy', 'pair:concernedBy', 'pair:hasPart']
    }
  },
  methods: {
    async transform({ slug, ...data }) {
      return ({
        type: 'og:Circle',
        ...data
      });
    }
  }
};
