import StatusCreate from './StatusCreate';
import TypeEdit from './StatusEdit';
import StatusList from './StatusList';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default {
  config: {
    list: StatusList,
    create: StatusCreate,
    edit: TypeEdit,
    icon: VisibilityIcon,
    options: {
      label: 'Statuts',
      parent: 'Concept'
    }
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
