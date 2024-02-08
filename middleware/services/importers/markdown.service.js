const urlJoin = require("url-join");
const path = require('path');
const { createReadStream, existsSync } = require('fs');
const { ImporterMixin, convertToIsoString } = require('@semapps/importer');
const { MIME_TYPES } = require('@semapps/mime-types');
const { getSlugFromUri } = require('@semapps/ldp');
const { lookup } = require('mime-types');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'importers.markdown',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, '../../imports/output/post')
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'documents'),
      filesContainerUri: urlJoin(CONFIG.HOME_URL, 'files'),
    }
  },
  methods: {
    async transform(markdown) {
      const { default: parseMd } = await import('parse-md');
      let { metadata, content } = parseMd(markdown)
      const { title, date, categories, tags, coverImage } = metadata;

      // if (!categories.includes('applications')) return false;

      const imageUri = await this.uploadImage('images/' + coverImage);

      // Remove all elementor lines (may contain image but we'll do without...)
      content = content.replaceAll(/^(\/\*\! elementor).*$/gm, '');

      // Remove all fusion builder tags
      // content = content.replaceAll(/^(\\\[\/fusion).*$/gm, '');
      // content = content.replaceAll(/^(\\\[fusion).*$/gm, '');
      // content = content.replaceAll(/\[fusion(.*)\]/g, '');
      content = content.replaceAll(/(\[fusion[^\]]+\])/gi, '');     
      content = content.replaceAll(/(\[\/fusion[^\]]+\])/gi, '');      

      // Remove TOC
      content = content.replaceAll(/^(\\\[toc\\\]).*$/gm, '');

      // Remove all backslashes
      content = content.replaceAll('\\', '');

      // Remove weird list bullets
      // content = content.replaceAll('\\*', '*');
      // content = content.replaceAll('\\-', '-');
      // content = content.replaceAll('\\\[', '[');
      // content = content.replaceAll('\\\]', ']');
      // content = content.replaceAll('\\\+', '+');
      // content = content.replaceAll('\\=>', '=>');

      const images = this.extractImages(content);

      for (let image of images) {
        if (!image.src.startsWith('http')) {
          const imageUri = await this.uploadImage(image.src);
  
          content = content.replace(`![](${image.src})`, `![](${imageUri})`);
        }
      }

      return ({
        type: 'pair:Document',
        'pair:label': title,
        'pair:description': content,
        'pair:hasType': urlJoin(CONFIG.HOME_URL, '/types/blogarticle'),
        'dc:created': convertToIsoString(date),
        image: imageUri
      });
    },
    async uploadImage(path) {
      const fullPath = this.settings.source.getAllFull + '/' + path;

      if (existsSync(fullPath)) {
        const stream = createReadStream(fullPath);
        const filename = getSlugFromUri(path);

        const imageUri = await this.broker.call('ldp.container.post', {
          containerUri: this.settings.dest.filesContainerUri,
          slug: filename,
          file: {
            filename,
            readableStream: stream,
            mimetype: lookup(path)
          },
          contentType: MIME_TYPES.JSON,
          webId: 'system'
        });

        return imageUri;
      }
    },
    extractImages(str) {
      const regex = /!\[(?<altText>.*)\]\s*\((?<imageURL>.+)\)|img\s*src="(?<imageURL1>[^"]*)"\s*alt="(?<altText1>[^"]*)" \/>|img\s*alt="(?<altText2>[^"]*)"\s*src="(?<imageURL2>[^"]*)" \/>/gm;
      let m;
      let images = [];
      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;
        images.push({
          alt : m.groups.altText ?? m.groups.altText1 ?? m.groups.altText2,
          src : m.groups.imageURL ?? m.groups.imageURL1 ?? m.groups.imageURL2
        });
      }
      return images;
    }
  }
};
