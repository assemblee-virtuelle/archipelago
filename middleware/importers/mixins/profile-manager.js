const ProfileManagerMixin = {
  created() {
    this.wikiProfiles = [];
  },
  methods: {
    async prepare() {
      this.wikiProfiles = await this.broker.call('importer.wiki.profils.list');
    },
    getProfileByEmail(email) {
      return email && this.wikiProfiles.find(p => p.bf_email === email);
    }
  }
};

module.exports = ProfileManagerMixin;
