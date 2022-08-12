const urlJoin = require("url-join");
const { MIME_TYPES } = require("@semapps/mime-types");
const { slugify, capitalize } = require("../utils/utils");
const CONFIG = require('../../config/config');

module.exports = {
  methods: {
    async createOrGetThemes(...labels) {
      const labelsArray = this.augment(
        labels
          .filter(l => l)
          .map(l => l.trim())
          .reduce((acc, value) => { acc.push(...value.split(/[,\n\r]+/)); return acc; }, [])
          .map(l => capitalize(l.trim()))
      );

      let themeUris = [];

      for( let label of labelsArray ) {
        const slug = slugify(label);
        const themeUri = urlJoin(CONFIG.HOME_URL, 'themes', slug);

        const themeExist = await this.broker.call('ldp.resource.exist', {
          resourceUri: themeUri,
          webId: 'system'
        });

        if( !themeExist ) {
          this.logger.info(`Theme "${label}" doesn't exist, creating it...`);
          await this.broker.call('ldp.container.post', {
            containerUri: urlJoin(CONFIG.HOME_URL, 'themes'),
            slug,
            resource: {
              '@type': 'pair:Theme',
              'pair:label': label,
            },
            contentType: MIME_TYPES.JSON,
            webId: 'system'
          });
        }

        themeUris.push(themeUri);
      }

      return themeUris;
    },
    augment(labels) {
      if( this.settings.themesAugmenter ) {
        let augmentedLabels = [...labels];
        for( let label of labels ) {
          for( let [key, value] of Object.entries(this.settings.themesAugmenter) ) {
            if( slugify(key) === slugify(label) ) augmentedLabels.push(value);
          }
        }
        return augmentedLabels
      } else {
        return labels;
      }
    }
  }
};
