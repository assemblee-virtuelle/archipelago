const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');
const { LDPNavigator, FetchAdapter } = require('fix-esm').require('ldp-navigator');
const { defaultContext } = require('@semapps/core');
const jsonld = require('jsonld');
const DereferenceMixin = require('../mixins/dereference');

module.exports = {
  dependencies: ['ldp.resource'],
  name: 'organizations',
  mixins: [ControlledContainerMixin, DisassemblyMixin, DereferenceMixin],
  settings: {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    preferredView: '/Organization',
    disassembly: [{ path: 'pair:organizationOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }],
    dereferencePlan: [{ p: 'pair:organizationOfMembership' }],
  },
}
