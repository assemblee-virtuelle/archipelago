import { lazy } from 'react';
import { BaseRecord, ForeignId, ImportableRecord } from '../../..';
import GroupList from './GroupList';
import GroupShow from './GroupShow';
import GroupIcon from '@mui/icons-material/Group';

export type PairGroupRecord = BaseRecord & ImportableRecord & {
  type: 'pair:Group';
  'pair:label': string;
  'pair:comment': string;
  'pair:description': string;
  image: string;
  'pair:affiliates': ForeignId[];
  'pair:involvedIn': ForeignId[];
  'pair:hasTopic': ForeignId[];
  'pair:documentedBy': ForeignId[];
};

const resource = {
  config: {
    list: GroupList,
    show: GroupShow,
    create: lazy(() => import('./GroupCreate')),
    edit: lazy(() => import('./GroupEdit')),
    icon: GroupIcon,
    options: {
      label: 'Groupes',

      parent: 'Actor', // Used in tree menu in leftMenu layout
      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairGroupRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Group'],
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
      name: 'Groupe |||| Groupes',
      create: 'Ajouter un nouveau groupe',
      fields: {
        'pair:label': 'Nom',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        image: 'Logo',
        'pair:affiliates': 'Membres',
        'pair:involvedIn': 'Participe à',
        'pair:hasTopic': 'Thèmes',
        'pair:documentedBy': 'Documents',

        helpers: {
          'pair:comment': 'Décrivez le groupe en quelques mots',
        }
      },
      form: {
        basicInformation: 'Informations de base',
        description: 'Description',
        other: 'Autres informations',
      }
    }
  }
};

export default resource;
