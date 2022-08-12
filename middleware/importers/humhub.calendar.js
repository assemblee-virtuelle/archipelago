const QueueMixin = require("moleculer-bull");
const { HumHubImporterMixin, convertToIsoString } = require('@semapps/importer');
const SpaceManagerMixin = require('./mixins/space-manager');
const urlJoin = require("url-join");
const CONFIG = require("../config/config");
const { getSlugByUrl, replaceEmojisByUnicode } = require("./utils/utils");

module.exports = {
  name: 'importer.humhub.calendar',
  mixins: [SpaceManagerMixin, HumHubImporterMixin, CONFIG.QUEUE_SERVICE_URL ? QueueMixin(CONFIG.QUEUE_SERVICE_URL) : {}],
  settings: {
    source: {
      humhub: {
        baseUrl: 'https://grandjardin.jardiniersdunous.org',
        jwtToken: CONFIG.HUMHUB_TOKEN,
        type: 'calendar',
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'events'),
    },
    cronJob: CONFIG.QUEUE_SERVICE_URL ? {
      time: '0 0 4 * * *', // Every night at 4am
      timeZone: 'Europe/Paris'
    } : undefined
  },
  methods: {
    async transform(data) {
      const humhubSpace = this.getSpaceByContainerId(data.content.metadata.contentcontainer_id);
      if (!humhubSpace) return false;

      const circleExist = await this.broker.call('ldp.resource.exist', {
        resourceUri: humhubSpace.circleUri,
        webId: 'system'
      });

      return({
        type: 'pair:Event',
        'pair:label': data.title,
        'pair:description': replaceEmojisByUnicode(data.description),
        'pair:startDate': convertToIsoString(data.start_datetime),
        'pair:endDate': convertToIsoString(data.end_datetime),
        'pair:concerns': circleExist ? humhubSpace.circleUri : urlJoin(CONFIG.HOME_URL, 'circles', 'jardiniers-du-nous'),
        'pair:involves': data.participants.attending.map(user => urlJoin(CONFIG.HOME_URL, 'users', getSlugByUrl(user.url))),
        'pair:webPage': urlJoin(this.settings.source.humhub.baseUrl, data.content.metadata.url),
        'dc:creator': urlJoin(CONFIG.HOME_URL, 'users', getSlugByUrl(data.content.metadata.created_by.url))
      })
    }
  }
};
