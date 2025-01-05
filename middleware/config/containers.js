const { getDefaultRights } = require('./defaultRights');

module.exports = [
  {
    path: '/'
  },
  {
    path: '/membership-associations',
    acceptedTypes: ['pair:MembershipAssociation'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/groups',
    preferredView: '/Group',
    acceptedTypes: ['pair:Group', 'og:Circle'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/projects',
    preferredView: '/Project',
    acceptedTypes: ['pair:Project', 'og:Circle'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/events',
    preferredView: '/Event',
    acceptedTypes: ['pair:Event'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/tasks',
    preferredView: '/Task',
    acceptedTypes: ['pair:Task'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/bots',
    acceptedTypes: ['as:Application'],
    excludeFromMirror: true
  },
  {
    path: '/ideas',
    preferredView: '/Idea',
    acceptedTypes: ['pair:Idea'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/themes',
    preferredView: '/Theme',
    acceptedTypes: ['pair:Theme'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/skills',
    preferredView: '/Skill',
    acceptedTypes: ['pair:Skill'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/membership-roles',
    preferredView: '/MembershipRole',
    acceptedTypes: ['pair:MembershipRole'],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/documents',
    preferredView: '/Document',
    acceptedTypes: ['pair:Document'],
    newResourcesPermissions: getDefaultRights
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
    ],
    newResourcesPermissions: getDefaultRights
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
    ],
    newResourcesPermissions: getDefaultRights
  },
  {
    path: '/pages',
    preferredView: '/Page',
    acceptedTypes: ['semapps:Page'],
    newResourcesPermissions: getDefaultRights
  }
];
