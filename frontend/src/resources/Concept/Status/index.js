import StatusCreate from './StatusCreate';
import TypeEdit from './StatusEdit';
import StatusList from './StatusList';
import VisibilityIcon from '@mui/icons-material/Visibility';

const resource = {
  config: {
    list: StatusList,
    create: StatusCreate,
    edit: TypeEdit,
    icon: VisibilityIcon,
    options: {
      label: 'Statuts',
      parent: 'Concept'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: [
      'pair:Status',
      'pair:ActivityStatus',
      'pair:AgentStatus',
      'pair:DocumentStatus',
      'pair:EventStatus',
      'pair:IdeaStatus',
      'pair:ProjectStatus',
      'pair:TaskStatus'
    ],
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
      name: 'Statut |||| Statuts',
      fields: {
        '@type': 'Classe',
        'pair:label': 'Nom'
      }
    }
  }
};

export default resource;
