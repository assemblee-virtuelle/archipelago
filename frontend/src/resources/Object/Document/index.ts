import { lazy } from 'react';
import DocumentList from './DocumentList';
import DocumentShow from './DocumentShow';
import DescriptionIcon from '@mui/icons-material/Description';
import { BaseRecord, ForeignId } from '../..';

export type DocumentRecord = BaseRecord & {
  type: 'pair:Document';
  'pair:label': string;
  'pair:comment'?: string;
  'pair:description'?: string;
  'pair:hasType'?: ForeignId;
  'pair:documents'?: ForeignId[];
  image?: string;
};

const resource = {
  config: {
    list: DocumentList,
    show: DocumentShow,
    create: lazy(() => import('./DocumentCreate')),
    edit: lazy(() => import('./DocumentEdit')),
    icon: DescriptionIcon,
    options: {
      label: 'Documents',

      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: DocumentRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Document'],
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
      name: 'Document |||| Documents',
      create: 'Ajouter un nouveau document',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Extrait',
        'pair:description': 'Contenu',
        'pair:image': 'Image',
        'pair:hasType': 'Type',
        'pair:documents': 'Documente'
      }
    }
  }
};

export default resource;
