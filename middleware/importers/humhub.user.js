const { HumHubImporterMixin } = require('@semapps/importer');
const ProfileManagerMixin = require('./mixins/profile-manager');
const urlJoin = require("url-join");
const CONFIG = require("../config/config");

module.exports = {
  name: 'importer.humhub.user',
  mixins: [ProfileManagerMixin, HumHubImporterMixin],
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
  },
  methods: {
    async transform(data) {
      let image, location;
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
        'pair:homePage': [data.profile.url, data.profile.url_facebook, data.profile.url_linkedin].filter(x => x),
        'pair:e-mail': data.account.email,
        'pair:depictedBy': image,
        'pair:hasLocation': location,
        'pair:affiliatedBy': urlJoin(CONFIG.HOME_URL, 'circles', 'jardiniers-du-nous'),
        // 'semapps:humhubId': data.account.contentcontainer_id,
      })
    }
  }
};
