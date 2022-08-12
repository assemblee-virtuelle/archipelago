const QueueMixin = require("moleculer-bull");
const { HumHubImporterMixin } = require('@semapps/importer');
const ProfileManagerMixin = require('./mixins/profile-manager');
const ThemeCreatorMixin = require('./mixins/theme-creator');
const urlJoin = require("url-join");
const CONFIG = require("../config/config");

module.exports = {
  name: 'importer.humhub.user',
  mixins: [ProfileManagerMixin, HumHubImporterMixin, ThemeCreatorMixin, CONFIG.QUEUE_SERVICE_URL ? QueueMixin(CONFIG.QUEUE_SERVICE_URL) : {}],
  settings: {
    source: {
      humhub: {
        baseUrl: 'https://grandjardin.jardiniersdunous.org',
        jwtToken: CONFIG.HUMHUB_TOKEN,
        type: 'user',
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'users'),
      predicatesToKeep: ['pair:affiliatedBy', 'pair:involvedIn']
    },
    cronJob: CONFIG.QUEUE_SERVICE_URL ? {
      time: '0 0 4 * * *', // Every night at 4am
      timeZone: 'Europe/Paris'
    } : undefined
  },
  methods: {
    async transform(data) {
      let image, location;

      const themes = await this.createOrGetThemes(...data.account.tags);

      const wikiProfile = this.getProfileByEmail(data.account.email)

      if (wikiProfile) {
        try {
          image = wikiProfile.bf_url_photo.replace('_org', '');
          const result = await fetch(image);
          if (!result.ok) {
            image = undefined;
          }
        } catch(e) {
          // Ignore invalid images
          image = undefined;
        }

        if (wikiProfile.bf_latitude && wikiProfile.bf_longitude) {
          location = {
            type: 'pair:Place',
            'pair:label': data.bf_ville || '',
            'pair:latitude': data.bf_latitude,
            'pair:longitude': data.bf_longitude
          }
        }
      }

      return({
        type: 'pair:Person',
        'pair:label': `${data.profile.firstname} ${data.profile.lastname}`,
        'pair:description': data.profile.about,
        'pair:firstName': data.profile.firstname,
        'pair:lastName': data.profile.lastname,
        'pair:phone': data.profile.mobile || data.profile.phone_work || data.profile.phone_private || undefined,
        'pair:webPage': data.url,
        'pair:homePage': [data.profile.url, data.profile.url_facebook, data.profile.url_linkedin].filter(x => x),
        'pair:e-mail': data.account.email,
        'pair:depictedBy': image,
        'pair:hasLocation': location,
        'pair:affiliatedBy': urlJoin(CONFIG.HOME_URL, 'circles', 'jardiniers-du-nous'),
        'pair:hasInterest': themes,
        // 'semapps:humhubId': data.account.contentcontainer_id,
      })
    }
  }
};
