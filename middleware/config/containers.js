const CONFIG = require('./config');

module.exports = [
  {
    path: '/'
  },
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress', 'pair:organizationOfMembership'],
    disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }]
  },
  {
    path: '/membership-associations',
    acceptedTypes: ['pair:MembershipAssociation']
  },
  {
    path: '/groups',
    acceptedTypes: ['pair:Group', 'og:Circle'],
    dereference: ['sec:publicKey']
  },
  {
    path: '/projects',
    acceptedTypes: ['pair:Project', 'og:Circle'],
    dereference: ['sec:publicKey']
  },
  {
    path: '/events',
    acceptedTypes: ['pair:Event']
  },
  {
    path: '/tasks',
    acceptedTypes: ['pair:Task']
  },
  {
    path: '/users',
    acceptedTypes: ['pair:Person'],
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress']
  },
  {
    path: '/ideas',
    acceptedTypes: 'pair:Idea'
  },
  {
    path: '/themes',
    acceptedTypes: 'pair:Theme'
  },
  {
    path: '/skills',
    acceptedTypes: 'pair:Skill'
  },
  {
    path: '/membership-roles',
    acceptedTypes: 'pair:MembershipRole'
  },
  {
    path: '/documents',
    acceptedTypes: 'pair:Document'
  },
  {
    path: '/status',
    acceptedTypes: [
      'pair:Status',
      'pair:ActivityStatus',
      'pair:AgentStatus',
      'pair:DocumentStatus',
      'pair:EventStatus',
      'pair:IdeaStatus',
      'pair:ProjectStatus',
      'pair:TaskStatus'
    ]
  },
  {
    path: '/types',
    acceptedTypes: [
      'pair:Type',
      'pair:ActivityType',
      'pair:AgentType',
      'pair:ConceptType',
      'pair:DocumentType',
      'pair:EventType',
      'pair:FolderType',
      'pair:GroupType',
      'pair:IdeaType',
      'pair:ObjectType',
      'pair:OrganizationType',
      'pair:PlaceType',
      'pair:ProjectType',
      'pair:ResourceType',
      'pair:SubjectType',
      'pair:TaskType'
    ]
  },
  {
    path: '/pages',
    acceptedTypes: ['semapps:Page']
  },
  {
    path: '/files'
  }
];
