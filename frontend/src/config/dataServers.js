const dataServers = {
  av: {
    name: 'Assemblée Virtuelle',
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
    authServer: true,
    default: true,
    containers: {
      av: {
        'pair:Organization': ['/organizations'],
        'pair:MembershipAssociation': ['/membership-associations'],
        'pair:MembershipRole': ['/membership-roles'],
        'pair:Group': ['/groups'],
        'pair:Project': ['/projects'],
        'pair:Event': ['/events'],
        'pair:Task': ['/tasks'],
        'pair:Person': ['/users'],
        'pair:Idea': ['/ideas'],
        'pair:Theme': ['/themes'],
        'pair:Skill': ['/skills'],
        'pair:Document': ['/documents'],
        'pair:Status': ['/status'],
        'pair:Type': ['/types'],
        'as:Note': ['/notes'],
        'semapps:Page': ['/pages']
      }
    },
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
