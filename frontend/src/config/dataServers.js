const dataServers = {
  av: {
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    authServer: true,
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
    externalLinks: false // Colibris doesn't have a public frontend
  },
  dp:{
    name: "Data-Players",
    baseUrl: "https://data.archipelago.data-players.com/",
    sparqlEndpoint: 'https://data.archipelago.data-players.com/sparql',
    containers: {
      dp: {
        'pair:Organization': ['/organizations'],
      }
    }
  }
};

export default dataServers;
