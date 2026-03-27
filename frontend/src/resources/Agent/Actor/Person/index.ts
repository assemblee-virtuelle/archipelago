import { lazy } from 'react';
import { BaseRecord, ForeignId } from '../../..';
import PersonList from './PersonList';
import PersonShow from './PersonShow';
import PersonIcon from '@mui/icons-material/Person';
import { PairLocation } from '../../Agent';

export type PairPersonRecord = BaseRecord & {
  type: 'pair:Person';
  'pair:label': string;
  'pair:firstName': string;
  'pair:lastName': string;
  'pair:comment': string;
  'pair:description': string;
  image: string;
  'pair:hasLocation': PairLocation;
  'pair:involvedIn': ForeignId[];
  'pair:affiliatedBy': ForeignId[];
  'pair:offers': ForeignId[];
  'pair:hasTopic': ForeignId[];
  'pair:actorOfMembership': ForeignId[];
};

const resource = {
  config: {
    list: PersonList,
    show: PersonShow,
    edit: lazy(() => import('./PersonEdit')),
    icon: PersonIcon,
    options: {
      label: 'Personnes',
      parent: 'Actor'
    },
    recordRepresentation: (record: PairPersonRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Person'],
    list: {
      servers: '@default',
      fetchContainer: true,
      forceArray: ['pair:actorOfMembership']
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Personne |||| Personnes',
      searchLabel: 'Rechercher une personne',
      fields: {
        'pair:firstName': 'Prénom',
        'pair:lastName': 'Nom de famille',
        'pair:comment': 'Courte présentation',
        'pair:description': 'Présentation',
        image: 'Photo',
        'pair:involvedIn': 'Impliqué dans',
        'pair:affiliatedBy': 'Membre de',
        'pair:offers': 'A pour compétences',
        'pair:hasTopic': 'A pour intérêt',
        'pair:hasLocation': 'Adresse',
        'pair:actorOfMembership': 'A pour rôles'
      },
      form: {
        basicInformation: 'Informations de base',
        other: 'Autres informations',
        members: 'Rôles'
      },
      deletePopup: {
        title: 'Suppression du compte utilisateur',
        content: 'Êtes-vous sûr·e de vouloir supprimer ce compte utilisateur ?',
        warningMessage: 'Cette action est irréversible.',
      }
    }
  }
};

export default resource;
