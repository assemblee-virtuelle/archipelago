const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');

module.exports = {
  name: 'users',
  mixins: [ControlledContainerMixin, DisassemblyMixin],
  settings: {
        path: '/organizations',
        acceptedTypes: ['pair:Organization'],
        preferredView: '/Organization',
        dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress'],
        disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }]
    },
  actions: {}
}