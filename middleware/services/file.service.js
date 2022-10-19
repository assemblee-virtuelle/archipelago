const { ControlledContainerMixin, ImageProcessorMixin } = require("@semapps/ldp");

module.exports = {
  name: 'file',
  mixins: [ImageProcessorMixin, ControlledContainerMixin],
  settings: {
    path: '/files',
    acceptedTypes: ['semapps:File']
  }
}
