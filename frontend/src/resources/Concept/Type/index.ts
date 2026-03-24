import { lazy } from 'react';
import TypeList from './TypeList';
import StyleIcon from '@mui/icons-material/Style';
import { BaseRecord, ForeignId, ResourceOptions } from '../..';

const types = [
  'pair:DocumentType',
  'pair:EventType',
  'pair:IdeaType',
  'pair:OrganizationType',
  'pair:ProjectType',
  'pair:TaskType',
] as const;

type PairTypeType = typeof types[number];

export type PairTypeRecord = BaseRecord & {
  type: PairTypeType | PairTypeType[];
  'pair:label': string;
  'pair:typeOf': ForeignId[];
};

export type TypeOptions = ResourceOptions & {
  types: PairTypeType[];
};

const resource = {
  config: {
    list: TypeList,
    create: lazy(() => import('./TypeCreate')),
    edit: lazy(() => import('./TypeEdit')),
    icon: StyleIcon,
    options: {
      label: 'Types',
      parent: 'Concept',
      types,
    },
    recordRepresentation: (record: PairTypeRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types,
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
      name: 'Type |||| Types',
      create: 'Créer un nouveau type',
      fields: {
        'pair:label': 'Nom',
        'type': 'Associé à',
      },
      types: {
        'pair:DocumentType': 'Documents',
        'pair:EventType': 'Evènements',
        'pair:IdeaType': 'Idées',
        'pair:OrganizationType': 'Organisations',
        'pair:ProjectType': 'Projets',
        'pair:TaskType': 'Tâches',
      }
    },
  },
};

export default resource;
