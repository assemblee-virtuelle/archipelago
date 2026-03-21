import { lazy } from 'react';
import PageList from './PageList';
import PageShow from './PageShow';
import DescriptionIcon from '@mui/icons-material/Description';
import { BaseRecord } from '..';

export type PageRecord = BaseRecord & {
  type: 'semapps:Page';
  'semapps:title': string;
  'semapps:content': string;
};

const resource = {
  config: {
    list: PageList,
    show: PageShow,
    create: lazy(() => import('./PageCreate')),
    edit: lazy(() => import('./PageEdit')),
    icon: DescriptionIcon,
    options: {
      label: 'Pages'
    },
    recordRepresentation: (record: PageRecord) => `${record['semapps:title']}`,
  },
  dataModel: {
    types: ['semapps:Page'],
    list: {
      servers: '@default',
      fetchContainer: true,
    },
    fieldsMapping: {
      title: 'semapps:title'
    }
  },
  translations: {
    fr: {
      name: 'Page |||| Pages',
      create: 'Créer une nouvelle page',
      fields: {
        'semapps:title': 'Titre de la page',
        'semapps:content': 'Contenu',
      }
    }
  }
};

export default resource;
