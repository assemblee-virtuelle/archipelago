import PersonIcon from '@mui/icons-material/Person';

export default {
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
