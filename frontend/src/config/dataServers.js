const dataServers = {
  pod: {
    pod: true,
    authServer: true,
    containers: {
      pod: {
        'vcard:Location': ['/locations'],
        'vcard:Individual': ['/profiles'],
      },
    }
  },
  av: {
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    default: true,
    uploadsContainer: '/files'
  },
  cdlt: {
    baseUrl: 'https://data.lescheminsdelatransition.org/',
    externalLinks: true,
  },
  colibris: {
    name: 'Colibris',
    baseUrl: 'https://colibris.social/',
    sparqlEndpoint: 'https://colibris.social/sparql',
    containers: {
      colibris: {
        'pair:Project': ['/lafabrique/projects'],
        'pair:Document': ['/lemag/articles'],
        'pair:Organization': ['/presdecheznous/organizations'],
        'pair:Theme': ['/themes']
      }
    },
    externalLinks: false, // The server doesn't have a public frontend
    noProxy: true, // The server doesn't support HTTP signature yet
  }
};

export default dataServers;
