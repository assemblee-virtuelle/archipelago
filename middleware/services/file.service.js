const { ControlledContainerMixin, ImageProcessorMixin, OrphanFilesDeletionMixin } = require("@semapps/ldp");
const { getDefaultRights } = require('../config/defaultRights');

module.exports = {
  name: 'file',
  mixins: [ImageProcessorMixin, ControlledContainerMixin, OrphanFilesDeletionMixin], // In that order
  settings: {
    path: '/files',
    acceptedTypes: ['semapps:File'],
    imageProcessor: {
      maxWidth: 1000,
      maxHeight: 1000
    },
    orphanFilesDeletion: {
      cronJob: false,
    },
    newResourcesPermissions: getDefaultRights,
  }
}
