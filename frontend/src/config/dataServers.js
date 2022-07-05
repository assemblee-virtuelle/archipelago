const dataServers = {
  av: {
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    authServer: true,
    default: true,
    uploadsContainer: '/files'
  },
  cdlt: {
    name: 'Les Chemins de la Transition',
    baseUrl: 'https://data.lescheminsdelatransition.org/',
    sparqlEndpoint: 'https://data.lescheminsdelatransition.org/sparql',
    containers: {
      cdlt: {
        'pair:Event': ['/events'],
        'pair:Place': ['/places'],
        'pair:Organization': ['/organizations'],
        'pair:Document': ['/documents'],
        'pair:Theme': ['/themes'],
        'pair:Skill': ['/skills'],
      }
    }
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
    }
  }
};

export default dataServers;
