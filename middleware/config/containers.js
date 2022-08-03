const CONFIG = require('./config');
const { ACTOR_TYPES } = require("@semapps/activitypub");

const anonymousRead = { anon: { read: true } };

module.exports = [
  {
    path: '/'
  },
  {
    path: '/circles',
    acceptedTypes: ['pair:Group', 'og:Circle'],
    dereference: ['pair:hasLocation'],
    permissions: anonymousRead,
    newResourcesPermissions: anonymousRead,
    readOnly: true,
  },
  // {
  //   path: '/organizations',
  //   acceptedTypes: ['pair:Organization'],
  //   preferredView: '/Organization',
  //   dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress', 'pair:organizationOfMembership'],
  //   disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }]
  // },
  // {
  //   path: '/membership-associations',
  //   acceptedTypes: ['pair:MembershipAssociation']
  // },
  // {
  //   path: '/groups',
  //   preferredView: '/Group',
  //   acceptedTypes: ['pair:Group', 'og:Circle'],
  //   dereference: ['sec:publicKey']
  // },
  // {
  //   path: '/projects',
  //   preferredView: '/Project',
  //   acceptedTypes: ['pair:Project', 'og:Circle'],
  //   dereference: ['sec:publicKey']
  // },
  {
    path: '/events',
    acceptedTypes: ['pair:Event'],
    permissions: anonymousRead,
    newResourcesPermissions: anonymousRead,
    readOnly: true,
  },
  // {
  //   path: '/tasks',
  //   preferredView: '/Task',
  //   acceptedTypes: ['pair:Task']
  // },
  {
    path: '/users',
    acceptedTypes: ['pair:Person'],
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress'],
    permissions: anonymousRead,
    newResourcesPermissions: anonymousRead,
    readOnly: true,
  },
  {
    path: '/bots',
    acceptedTypes: [ACTOR_TYPES.APPLICATION],
    dereference: ['sec:publicKey'],
    excludeFromMirror: true,
    permissions: anonymousRead,
    newResourcesPermissions: anonymousRead,
    readOnly: true,
  },
  // {
  //   path: '/ideas',
  //   preferredView: '/Idea',
  //   acceptedTypes: ['pair:Idea']
  // },
  // {
  //   path: '/themes',
  //   preferredView: '/Theme',
  //   acceptedTypes: ['pair:Theme']
  // },
  // {
  //   path: '/skills',
  //   preferredView: '/Skill',
  //   acceptedTypes: ['pair:Skill']
  // },
  // {
  //   path: '/membership-roles',
  //   preferredView: '/MembershipRole',
  //   acceptedTypes: ['pair:MembershipRole']
  // },
  {
    path: '/documents',
    acceptedTypes: ['pair:Document'],
    permissions: anonymousRead,
    newResourcesPermissions: anonymousRead,
    readOnly: true,
  },
  // {
  //   path: '/status',
  //   preferredView: '/Status',
  //   acceptedTypes: [
  //     'pair:Status',
  //     'pair:ActivityStatus',
  //     'pair:AgentStatus',
  //     'pair:DocumentStatus',
  //     'pair:EventStatus',
  //     'pair:IdeaStatus',
  //     'pair:ProjectStatus',
  //     'pair:TaskStatus'
  //   ]
  // },
  // {
  //   path: '/types',
  //   preferredView: '/Type',
  //   acceptedTypes: [
  //     'pair:Type',
  //     'pair:ActivityType',
  //     'pair:AgentType',
  //     'pair:ConceptType',
  //     'pair:DocumentType',
  //     'pair:EventType',
  //     'pair:FolderType',
  //     'pair:GroupType',
  //     'pair:IdeaType',
  //     'pair:ObjectType',
  //     'pair:OrganizationType',
  //     'pair:PlaceType',
  //     'pair:ProjectType',
  //     'pair:ResourceType',
  //     'pair:SubjectType',
  //     'pair:TaskType'
  //   ]
  // },
  // {
  //   path: '/pages',
  //   preferredView: '/Page',
  //   acceptedTypes: ['semapps:Page']
  // },
  // {
  //   path: '/files'
  // }
];
