import PersonIcon from '@mui/icons-material/Person';

const resource = {
  config: {
    icon: PersonIcon,
    options: {
      label: 'Objets'
    }
  },
  dataModel: {
    types: ['pair:Document'],
    list: {
      servers: '@default',
    }
  },
  translations: {
    fr: {
      name: 'Objet |||| Objets'
    }
  }
};

export default resource;
