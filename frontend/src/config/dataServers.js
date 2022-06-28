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
        'pair:Organization': ['/organizations'],
        'pair:Theme': ['/themes'],
        'pair:Skill': ['/skills']
      }
    }
  }
};

export default dataServers;
