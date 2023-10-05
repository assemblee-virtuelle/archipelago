const CONFIG = require('../config/config');
const { ControlledContainerMixin, DisassemblyMixin } = require('@semapps/ldp');
const { LDPNavigator, FetchAdapter } = require('fix-esm').require('ldp-navigator');
const { defaultContext } = require('@semapps/core');
const jsonld = require('jsonld');
const DereferenceMixin = require('../mixins/dereference');

module.exports = {
  name: 'users',
  mixins: [ControlledContainerMixin, DisassemblyMixin, DereferenceMixin],
  settings: {
    path: '/users',
    preferredView: '/Person',
    acceptedTypes: ['pair:Person'],
    disassembly: [{ path: 'pair:actorOfMembership', container: CONFIG.HOME_URL + 'membership-associations' }],
  },
}