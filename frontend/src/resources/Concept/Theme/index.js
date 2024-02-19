import ThemeCreate from './ThemeCreate';
import ThemeEdit from './ThemeEdit';
import ThemeList from './ThemeList';
import ThemeShow from './ThemeShow';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default {
  config: {
    list: ThemeList,
    show: ThemeShow,
    create: ThemeCreate,
    edit: ThemeEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Thèmes',
      parent: 'Concept'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Theme'],
    list: {
      servers: '@default',
      blankNodes: []
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Thème |||| Thèmes',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
