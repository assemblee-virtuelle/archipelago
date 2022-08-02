const getSlugByUrl = url => {
  if (url) {
    const splitUrl = url.split('/');
    let slug = splitUrl.pop();
    // If slug is empty, there was an ending slash
    if (!slug) slug = splitUrl.pop();
    return slug;
  }
};

module.exports = {
  getSlugByUrl
};
