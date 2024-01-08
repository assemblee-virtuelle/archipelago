const urlJoin = require('url-join');
const TurndownService = require('turndown');
const { WordpressImporterMixin } = require('@semapps/importer');
const CONFIG = require('../config/config');

module.exports = {
  name: 'importers.wordpress',
  mixins: [WordpressImporterMixin],
  settings: {
    source: {
      wordpress: {
        baseUrl: 'https://virtual-assembly.org',
        type: 'posts'
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, '/documents'),
      filesContainerUri: urlJoin(CONFIG.HOME_URL, '/files'),
    },
  },
  created() {
    // Options available here: https://github.com/mixmark-io/turndown?tab=readme-ov-file#options
    this.turndownService = new TurndownService();
  },
  methods: {
    transform(data) {
      const image = data['wp:featuredmedia']?.[0]?.href && this.retrieveMedia(data['wp:featuredmedia']?.href);

      // Convert HTML to Markdown
      let content = this.turndownService.turndown(data.content?.rendered)

      // Remove weird list bullets
      content = content.replaceAll('\\*', '*');

      // Remove all elementor lines (may contain image but we'll do without...)
      content = content.replaceAll(/^(\/\*\! elementor).*$/gm, '');

      // Remove all fusion builer lines
      content = content.replaceAll(/^(\\\[\/fusion).*$/gm, '');

      return({
        'type': 'pair:Document',
        'pair:hasType': urlJoin(CONFIG.HOME_URL, '/types/blogarticle'),
        'pair:label': data.title?.rendered,
        'pair:description': content,
        image,
      });
    }
  }
};
