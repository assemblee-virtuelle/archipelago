const { ControlledContainerMixin, ImageProcessorMixin } = require("@semapps/ldp");

module.exports = {
  name: 'file',
  mixins: [ImageProcessorMixin, ControlledContainerMixin], // In that order
  settings: {
    path: '/files',
    acceptedTypes: ['semapps:File'],
    imageProcessor: {
      maxWidth: 1000,
      maxHeight: 1000
    }
  }
}