const { HumHubImporterMixin, convertToIsoString } = require('@semapps/importer');
const SpaceManagerMixin = require('./mixins/space-manager');
const urlJoin = require("url-join");
const CONFIG = require("../config/config");
const {getSlugByUrl} = require("./utils/utils");

module.exports = {
  name: 'importer.humhub.calendar',
  mixins: [SpaceManagerMixin, HumHubImporterMixin],
  settings: {
    source: {
      humhub: {
        baseUrl: 'https://grandjardin.jardiniersdunous.org',
        jwtToken: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyN30.UcZ9LvJwMNZVBA9QEJiU74f4eoUzeJ7L61GeOOOGE5aAZSKIVUFPQ42CzLtPPyEquwu7stnXlbJCD2Rh2OKlXw',
        type: 'calendar',
      },
      fieldsMapping: {
        slug: data => data.content.metadata.guid,
        created: data => convertToIsoString(data.content.metadata.created_at)
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'events'),
    },
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
        'pair:description': data.description,
        'pair:startDate': convertToIsoString(data.start_datetime),
        'pair:endDate': convertToIsoString(data.end_datetime),
        'pair:concerns': circleExist ? humhubSpace.circleUri : urlJoin(CONFIG.HOME_URL, 'circles', 'jardiniers-du-nous'),
        'pair:involves': data.participants.attending.map(user => urlJoin(CONFIG.HOME_URL, 'users', getSlugByUrl(user.url)))
      })
    }
  }
};
