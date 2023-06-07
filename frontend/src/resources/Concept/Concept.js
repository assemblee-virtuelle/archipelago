import LanguageIcon from '@mui/icons-material/Language';

export default {
  config: {
    icon: LanguageIcon,
    options: {
      label: 'Concepts'
    }
  },
  dataModel: {
    types: ['pair:Theme'],
    list: {
      servers: '@default',
    }
  },
  translations: {
    fr: {
      name: 'Concept |||| Concepts'
    }
  }
};
