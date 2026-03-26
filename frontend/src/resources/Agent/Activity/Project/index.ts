import { lazy } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ProjectList from './ProjectList';
import ProjectShow from './ProjectShow';
import { BaseRecord, ForeignId, ImportableRecord } from '../../..';

export type PairProjectRecord = BaseRecord & ImportableRecord & {
  type: 'pair:Project';
  'pair:label': string;
  'pair:comment'?: string;
  'pair:description'?: string;
  'pair:hasStatus'?: ForeignId;
  'pair:hasType'?: ForeignId;
  'pair:homePage'?: string;
  image?: string;
  'pair:involves'?: ForeignId[];
  'pair:needs'?: ForeignId[];
  'pair:documentedBy'?: ForeignId[];
  'pair:hasTopic'?: ForeignId[];
};

const resource = {
  config: {
    list: ProjectList,
    show: ProjectShow,
    create: lazy(() => import('./ProjectCreate')),
    edit: lazy(() => import('./ProjectEdit')),
    icon: SettingsIcon,
    options: {
      label: 'Projets',

      parent: 'Activity', // Used in tree menu in leftMenu layout
      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairProjectRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Project'],
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
      name: 'Projet |||| Projets',
      searchLabel: 'Rechercher un projet',
      create: 'Ajouter un nouveau projet',
      fields: {
        'pair:label': 'Nom',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:hasStatus': 'Statut',
        'pair:homePage': 'Site web',
        'pair:involves': 'Organisations impliqués',
        'pair:needs': 'Compétences requises',
        'pair:documentedBy': 'Documents associés',
        'pair:hasTopic': 'Thèmes',
        'pair:hasType': 'Type',
        image: 'Image',
      },
      form: {
        basicInformation: 'Informations de base',
        description: 'Description',
        contact: 'Contact',
        other: 'Autres informations',
      },
    }
  }
};

export default resource;
