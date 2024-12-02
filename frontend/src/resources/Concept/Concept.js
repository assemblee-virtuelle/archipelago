import LanguageIcon from '@mui/icons-material/Language';

const resource = {
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
      fetchContainer: true,
    }
  },
  translations: {
    fr: {
      name: 'Concept |||| Concepts'
    }
  }
};

export default resource;
