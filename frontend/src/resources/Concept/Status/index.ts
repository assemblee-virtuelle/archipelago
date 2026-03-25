import { lazy } from 'react';
import StatusList from './StatusList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BaseRecord, ResourceOptions } from '../..';

const statusTypes = [
  'pair:AgentStatus',
  'pair:IdeaStatus',
  'pair:ProjectStatus',
  'pair:TaskStatus',
] as const;

type PairStatusType = typeof statusTypes[number];

export type PairStatusRecord = BaseRecord & {
  type: PairStatusType | PairStatusType[];
  'pair:label': string;
};

export type StatusOptions = ResourceOptions & {
  types: PairStatusType[];
};

const resource = {
  config: {
    list: StatusList,
    create: lazy(() => import('./StatusCreate')),
    edit: lazy(() => import('./StatusEdit')),
    icon: VisibilityIcon,
    options: {
      label: 'Statuts',
      parent: 'Concept',
      types: statusTypes,
    },
    recordRepresentation: (record: PairStatusRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: statusTypes,
    list: {
      servers: '@default',
      fetchContainer: true,
      blankNodes: [],
    },
    fieldsMapping: {
      title: 'pair:label',
    },
  },
  translations: {
    fr: {
      name: 'Statut |||| Statuts',
      create: 'Créer un nouveau statut',
      fields: {
        'pair:label': 'Nom',
        'type': 'Associé à',
      },
      types: {
        'pair:AgentStatus': 'Organisations',
        'pair:IdeaStatus': 'Idées',
        'pair:ProjectStatus': 'Projets',
        'pair:TaskStatus': 'Tâches',
      },
    },
  },
};

export default resource;
