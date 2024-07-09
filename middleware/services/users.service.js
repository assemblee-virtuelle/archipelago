const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');

module.exports = {
  name: 'users',
  mixins: [ControlledContainerMixin, DisassemblyMixin],
  settings: {
    path: '/users',
    preferredView: '/Person',
    acceptedTypes: ['pair:Person'],
    disassembly: [{ path: 'pair:actorOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }],
  },
}
