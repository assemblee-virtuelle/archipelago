import { lazy } from 'react';
import EventIcon from '@mui/icons-material/Event';
import EventList from './EventList';
import EventShow from './EventShow';
import { PairLocation } from '../../Agent';
import { BaseRecord, ForeignId } from '../../..';

export type PairEventRecord = BaseRecord & {
  type: 'pair:Event';
  'pair:label': string;
  'pair:startDate': string;
  'pair:endDate'?: string;
  'pair:hasLocation'?: PairLocation;
  'pair:comment'?: string;
  'pair:description'?: string;
  'pair:involves'?: ForeignId[];
  'pair:hasTopic'?: ForeignId[];
  'pair:aboutPage'?: string;
  image?: string;
};

const resource = {
  config: {
    list: EventList,
    show: EventShow,
    create: lazy(() => import('./EventCreate')),
    edit: lazy(() => import('./EventEdit')),
    icon: EventIcon,
    options: {
      label: 'Événements',

      parent: 'Activity', // Used in tree menu in leftMenu layout
      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairEventRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Event'],
    list: {
      servers: '@default',
      fetchContainer: true,
    },
    fieldsMapping: {
      title: 'pair:label',
    },
  },
  translations: {
    fr: {
      name: 'Evènement |||| Evènements',
      searchLabel: 'Rechercher un évènement',
      addToCalendar: 'Ajouter à mon agenda',
      create: 'Créer un nouvel évènement',
      fields: {
        'pair:label': 'Nom',
        'pair:description': 'Description',
        'pair:comment': 'Courte description',
        'pair:aboutPage': 'Page web de l\'évènement',
        'pair:hasLocation': 'Lieu',
        'pair:startDate': 'Date de début',
        'pair:endDate': 'Date de fin',
        'pair:involves': 'Acteurs impliqués',
        'pair:hasTopic': 'Thèmes',

        helpers: {
          'pair:comment': 'Décrivez votre évènement en quelques mots',
          'pair:description': 'Décrivez plus précisément votre évènement (programme, intervenant·e·s, etc.)',
          'pair:endDate': 'La date de fin est optionnelle',
          'pair:involves': 'Indiquez ici les organisations, groupes ou personnes qui sont impliqués dans l\'évènement',
          'pair:aboutPage': 'Billetterie, page d\'inscription, etc.',
        },

        validators: {
          'pair:endDate.minValue': 'La date de fin est incorrecte'
        }
      },
      form: {
        basicInformation: 'Informations de base',
        description: 'Description',
        other: 'Autres informations',
      },
    },
  },
};

export default resource;
