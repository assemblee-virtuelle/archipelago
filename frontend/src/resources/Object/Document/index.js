import CreateOrImport from '../../../common/CreateOrImport';
import DocumentEdit from './DocumentEdit';
import DocumentList from './DocumentList';
import DocumentShow from './DocumentShow';
import DescriptionIcon from '@mui/icons-material/Description';

export default {
  config: {
    list: DocumentList,
    show: DocumentShow,
    create: CreateOrImport,
    edit: DocumentEdit,
    icon: DescriptionIcon,
    options: {
      label: 'Documents'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Document'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Document |||| Documents',
      fields: {
        'pair:label': 'Titre',
        'pair:description': 'Description',
        'pair:comment': 'Courte description',
        'pair:hasType': 'Type',
        'pair:documents': 'Documente'
      }
    }
  }
};
