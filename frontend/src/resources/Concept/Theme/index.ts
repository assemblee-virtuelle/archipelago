import { lazy } from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ThemeList from './ThemeList';
import ThemeShow from './ThemeShow';
import { BaseRecord, ForeignId } from '../..';

export type PairThemeRecord = BaseRecord & {
  type: 'pair:Theme';
  'pair:label': string;
  'pair:description'?: string;
  'pair:broader': ForeignId;
  'pair:topicOf'?: ForeignId[];
};

const resource = {
  config: {
    list: ThemeList,
    show: ThemeShow,
    create: lazy(() => import('./ThemeCreate')),
    edit: lazy(() => import('./ThemeEdit')),
    icon: LocalOfferIcon,
    options: {
      label: 'Thèmes',
      parent: 'Concept'
    },
    recordRepresentation: (record: PairThemeRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Theme'],
    list: {
      servers: '@default',
      fetchContainer: true,
      blankNodes: []
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Thème |||| Thèmes',
      create: 'Ajouter un nouveau thème',
      fields: {
        'pair:label': 'Nom',
        'pair:description': 'Description',
        'pair:broader': 'Thème parent',
        'pair:topicOf': 'Sujet de',

        helpers: {
          'pair:broader': 'Choisissez un thème qui sera le parent de celui-ci dans l\'arborescence.'
        },

        validators: {
          'pair:broader.parent': 'Le thème ne peut pas être son propre parent'
        }
      }
    }
  }
};

export default resource;
