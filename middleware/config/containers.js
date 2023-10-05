const CONFIG = require('./config');
const { ACTOR_TYPES } = require("@semapps/activitypub");

module.exports = [
  {
    path: '/'
  },
  {
    path: '/membership-associations',
    acceptedTypes: ['pair:MembershipAssociation'],
  },
  {
    path: '/groups',
    preferredView: '/Group',
    acceptedTypes: ['pair:Group', 'og:Circle'],
    // dereference: ['sec:publicKey']
  },
  {
    path: '/projects',
    preferredView: '/Project',
    acceptedTypes: ['pair:Project', 'og:Circle'],
    // dereference: ['sec:publicKey']
  },
  {
    path: '/events',
    preferredView: '/Event',
    acceptedTypes: ['pair:Event'],
    // dereference: ['pair:hasLocation/pair:hasPostalAddress']
  },
  {
    path: '/tasks',
    preferredView: '/Task',
    acceptedTypes: ['pair:Task']
  },
  {
    path: '/bots',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    // dereference: ['sec:publicKey'],
    excludeFromMirror: true
  },
  {
    path: '/ideas',
    preferredView: '/Idea',
    acceptedTypes: ['pair:Idea']
  },
  {
    path: '/themes',
    preferredView: '/Theme',
    acceptedTypes: ['pair:Theme']
  },
  {
    path: '/skills',
    preferredView: '/Skill',
    acceptedTypes: ['pair:Skill']
  },
  {
    path: '/membership-roles',
    preferredView: '/MembershipRole',
    acceptedTypes: ['pair:MembershipRole']
  },
  {
    path: '/documents',
    preferredView: '/Document',
    acceptedTypes: ['pair:Document']
  },
  {
    path: '/status',
    preferredView: '/Status',
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
    preferredView: '/Type',
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
    preferredView: '/Page',
    acceptedTypes: ['semapps:Page']
  }
];
