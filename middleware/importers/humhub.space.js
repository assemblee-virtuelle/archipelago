const { HumHubImporterMixin } = require('@semapps/importer');

module.exports = {
  name: 'importer.humhub.space',
  mixins: [HumHubImporterMixin],
  settings: {
    source: {
      humhub: {
        baseUrl: 'https://grandjardin.jardiniersdunous.org',
        jwtToken: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyN30.UcZ9LvJwMNZVBA9QEJiU74f4eoUzeJ7L61GeOOOGE5aAZSKIVUFPQ42CzLtPPyEquwu7stnXlbJCD2Rh2OKlXw',
        type: 'space',
      }
    }
  }
};
