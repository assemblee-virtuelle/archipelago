import { lazy } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import OrganizationList from './OrganizationList';
import OrganizationShow from './OrganizationShow';
import { PairLocation } from '../../Agent';
import { BaseRecord, ForeignId } from '../../..';

export type PairOrganizationRecord = BaseRecord & {
  type: 'pair:Organization';
  'pair:label': string;
  'pair:comment'?: string;
  'pair:description'?: string;
  'pair:homePage'?: string | string[];
  'pair:e-mail'?: string;
  image?: string;
  'pair:partnerOf'?: ForeignId[];
  'pair:involvedIn'?: ForeignId[];
  'pair:hasType'?: ForeignId;
  'pair:hasStatus'?: ForeignId;
  'pair:hasTopic'?: ForeignId[];
  'pair:documentedBy'?: ForeignId[];
  'pair:hasLocation'?: PairLocation;
  'pair:organizationOfMembership'?: ForeignId[];
};

const resource = {
  config: {
    list: OrganizationList,
    show: OrganizationShow,
    create: lazy(() => import('./OrganizationCreate')),
    edit: lazy(() => import('./OrganizationEdit')),
    icon: HomeIcon,
    options: {
      label: 'Organisations',

      parent: 'Actor', // Used in tree menu in leftMenu layout
      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairOrganizationRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Organization'],
    list: {
      servers: '@default',
      fetchContainer: true,
      forceArray: ['pair:organizationOfMembership', 'pair:homePage']
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Organisation |||| Organisations',
      searchLabel: 'Rechercher une organisation',
      create: 'Ajouter une nouvelle organisation',
      fields: {
        'pair:label': 'Nom',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:homePage': 'Site web',
        'pair:e-mail': 'E-mail de contact',
        image: 'Logo',
        'pair:partnerOf': 'Partenaires',
        'pair:involvedIn': 'Impliqué dans',
        'pair:hasType': 'Type',
        'pair:hasStatus': 'Statut',
        'pair:hasTopic': 'Thèmes',
        'pair:documentedBy': 'Documenté par',
        'pair:hasLocation': 'Adresse',
        'pair:organizationOfMembership': 'Membres de l\'organisation',
        'pair:membershipActor': 'Membre',
        'pair:membershipRole': 'Rôle',

        helpers: {
          'pair:comment': 'Décrivez l\'organisation en quelques mots',
          'pair:hasType': "Vous pouvez indiquer ici le statut juridique de l'organisation",
          'pair:hasStatus': "Vous pouvez indiquer ici si l'organisation est toujours active ou non",
          'pair:hasLocation': "Si l'organisation n'a pas d'adresse physique, laissez ce champ libre",
          'pair:partnerOf': 'Facultatif. Indiquez ici les autres organisations partenaires de celle-ci',
          'pair:involvedIn': "Facultatif. Indiquez ici les évènements dans lesquels cette organisation a été impliqué",
          'pair:organizationOfMembership': "Vous pouvez renseigner ici les personnes membres de l'organisation",
        }
      },
      form: {
        basicInformation: 'Informations de base',
        description: 'Description',
        contact: 'Contact',
        other: 'Autres informations',
        members: 'Membres'
      }
    }
  }
};

export default resource;
