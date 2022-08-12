const emoji = require('emoji-dictionary');
const createSlug = require('speakingurl');

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

const getSlugByUrl = url => {
  if (url) {
    const splitUrl = url.split('/');
    let slug = splitUrl.pop();
    // If slug is empty, there was an ending slash
    if (!slug) slug = splitUrl.pop();
    return slug;
  }
};

const replaceEmojisByUnicode = text => text.replace(/:\w+:/gi, name => emoji.getUnicode(name));

const slugify = label => createSlug(label.trim(), { lang: 'fr', custom: { '.': '.', 'Ǧ': 'g' } });

module.exports = {
  capitalize,
  getSlugByUrl,
  replaceEmojisByUnicode,
  slugify
};
