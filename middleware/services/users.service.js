const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');
const DereferenceMixin = require('../mixins/dereference');

module.exports = {
  name: 'users',
  mixins: [ControlledContainerMixin/*, DisassemblyMixin, DereferenceMixin*/],
  settings: {
    path: '/users',
    preferredView: '/Person',
    acceptedTypes: ['pair:Person'],
    disassembly: [{ path: 'pair:actorOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }],
    dereferencePlan: [{ p: 'pair:actorOfMembership' }],
  },
}