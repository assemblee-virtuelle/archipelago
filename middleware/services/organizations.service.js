const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');

module.exports = {
  dependencies: ['ldp.resource'],
  name: 'organizations',
  mixins: [ControlledContainerMixin, DisassemblyMixin],
  settings: {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    preferredView: '/Organization',
    disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }],
  },
}
