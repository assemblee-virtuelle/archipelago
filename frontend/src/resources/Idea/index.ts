import { lazy } from 'react';
import IdeaIcon from '@mui/icons-material/EmojiObjects';
import { BaseRecord, ForeignId, ImportableRecord } from '..';
import IdeaList from './IdeaList';
import IdeaShow from './IdeaShow';

export type PairIdeaRecord = BaseRecord & ImportableRecord & {
  type: 'pair:Idea';
  'pair:label': string;
  'pair:comment'?: string;
  'pair:description'?: string;
  'pair:hasType'?: ForeignId;
  'pair:hasStatus'?: ForeignId;
  'pair:brainstormedBy'?: ForeignId[];
  'pair:concretizedBy'?: ForeignId[];
};

const resource = {
  config: {
    list: IdeaList,
    show: IdeaShow,
    create: lazy(() => import('./IdeaCreate')),
    edit: lazy(() => import('./IdeaEdit')),
    icon: IdeaIcon,
    options: {
      label: 'Idées',

      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairIdeaRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Idea'],
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
      name: 'Idée |||| Idées',
      searchLabel: 'Rechercher une idée',
      create: 'Créer une nouvelle idée',
      fields: {
        'pair:label': 'Titre',
        'pair:description': 'Description',
        'pair:brainstormedBy': 'Imaginée par' /*Actor*/,
        'pair:concretizedBy': 'Concrétisée par' /*Activity*/,
        'pair:hasType': 'Type',
        'pair:hasStatus': 'Statut',
        'pair:comment': 'Courte description'
      }
    }
  }
};

export default resource;
