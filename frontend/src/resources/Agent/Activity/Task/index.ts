import { lazy } from 'react';
import TaskList from './TaskList';
import TaskShow from './TaskShow';
import TaskIcon from '@mui/icons-material/PlaylistAddCheck';
import { BaseRecord, ForeignId, ImportableRecord } from '../../..';

export type PairTaskRecord = BaseRecord & ImportableRecord & {
  type: 'pair:Project';
  'pair:label': string;
  'pair:description'?: string;
  'pair:dueDate'?: string;
  'pair:endDate'?: string;
  'pair:hasType'?: ForeignId;
  'pair:hasStatus'?: ForeignId;
  'pair:assignedTo'?: ForeignId[];
  'pair:partOf'?: ForeignId[];
  'pair:hasFollower'?: ForeignId[];
  'pair:involves'?: ForeignId[];
  'pair:inspiredBy'?: ForeignId[];
  'pair:hasTopic'?: ForeignId[];
  'pair:needs'?: ForeignId[];
  'pair:uses'?: ForeignId[];
};

const resource = {
  config: {
    list: TaskList,
    show: TaskShow,
    create: lazy(() => import('./TaskCreate')),
    edit: lazy(() => import('./TaskEdit')),
    icon: TaskIcon,
    options: {
      label: 'Tâches',

      parent: 'Activity', // Used in tree menu in leftMenu layout
      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairTaskRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Task'],
    list: {
      servers: '@default',
      fetchContainer: true,
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Tâche |||| Tâches',
      searchLabel: 'Rechercher une tâche',
      create: 'Créer une nouvelle tâche',
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
      },
      form: {
        basicInformation: 'Informations de base',
        description: 'Description',
        other: 'Autres informations',
      },
    }
  }
};

export default resource;
