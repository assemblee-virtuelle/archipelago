const urlJoin = require("url-join");
const QueueMixin = require("moleculer-bull");
const { YesWikiImporterMixin } = require('@semapps/importer');
const SpaceManagerMixin = require('./mixins/space-manager');
const CONFIG = require('../config/config');
const { getSlugByUrl } = require("./utils/utils");

module.exports = {
  name: 'importer.wiki.jardins-locaux',
  mixins: [SpaceManagerMixin, YesWikiImporterMixin, CONFIG.QUEUE_SERVICE_URL ? QueueMixin(CONFIG.QUEUE_SERVICE_URL) : {}],
  settings: {
    source: {
      yeswiki: {
        baseUrl: 'https://www.jardiniersdunous.org',
        oldApi: true,
        formId: 6
      },
      fieldsMapping: {
        slug: data => getSlugByUrl(data.bf_intranet),
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'circles'),
      predicatesToKeep: ['pair:documentedBy', 'pair:concernedBy']
    },
    cronJob: CONFIG.QUEUE_SERVICE_URL ? {
      time: '0 0 4 * * *', // Every night at 4am
      timeZone: 'Europe/Paris'
    } : undefined
  },
  methods: {
    async transform(data) {
      // For now, only process spaces with a link to humhub
      const humhubSpace = this.getSpaceByUrl(data.bf_intranet);
      if (!humhubSpace) return false;

      const location = data.bf_latitude && data.bf_longitude
        ? {
            type: 'pair:Place',
            'pair:label': data.bf_ville,
            'pair:latitude': data.bf_latitude,
            'pair:longitude': data.bf_longitude
          }
        : undefined;

      return({
        type: 'og:Circle',
        'pair:label': humhubSpace.name,
        'pair:comment': humhubSpace.description,
        'pair:homePage': humhubSpace.url,
        'og:purpose': data.bf_raisondetre ? data.bf_raisondetre.trim() : undefined,
        'pair:partOf': urlJoin(CONFIG.HOME_URL, 'circles', 'jardins-locaux'),
        'pair:hasLocation': location,
        'pair:affiliates': humhubSpace.members ? humhubSpace.members.map(member => urlJoin(CONFIG.HOME_URL, 'users', getSlugByUrl(member.user.url))) : undefined,
        // 'semapps:humhubId': humhubSpace.contentcontainer_id,
      })
    },
  }
};
