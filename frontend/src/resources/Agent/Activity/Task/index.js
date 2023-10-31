import CreateOrImport from '../../../../common/CreateOrImport';
import TaskEdit from './TaskEdit';
import TaskList from './TaskList';
import TaskShow from './TaskShow';
import TaskIcon from '@mui/icons-material/PlaylistAddCheck';

export default {
  config: {
    list: TaskList,
    show: TaskShow,
    create: CreateOrImport,
    edit: TaskEdit,
    icon: TaskIcon,
    options: {
      label: 'Tâches',
      parent: 'Activity'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Task'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Tâche |||| Tâches',
      fields: {
        'pair:label': 'Titre',
        'pair:description': 'Description',
        'pair:assignedTo': 'Est assigné à',
        'pair:partOf': 'Fait partie de',
        'pair:hasType': 'Type',
        'pair:hasStatus': 'Statut',
        'pair:dueDate': 'Date attendue',
        'pair:endDate': 'Date de fin effective',
        'pair:hasFollower': 'Suivie par',
        'pair:involves': 'Implique',
        'pair:inspiredBy': 'Inspiré par',
        'pair:hasTopic': 'A pour thème',
        'pair:needs': 'A besoin de',
        'pair:uses': 'Utilise'
      }
    }
  }
};
