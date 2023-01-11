import CreateOrImport from '../../../../common/CreateOrImport';
import OrganizationEdit from './OrganizationEdit';
import OrganizationList from './OrganizationList';
import OrganizationShow from './OrganizationShow';
import HomeIcon from '@mui/icons-material/Home';

export default {
  config: {
    list: OrganizationList,
    show: OrganizationShow,
    create: CreateOrImport,
    edit: OrganizationEdit,
    icon: HomeIcon,
    options: {
      label: 'Organisations',
      parent: 'Actor'
    }
  },
  dataModel: {
    types: ['pair:Organization'],
    list: {
      servers: '@default',
      forceArray: ['pair:organizationOfMembership']
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Organisation |||| Organisations',
      fields: {
        'pair:label': 'Nom',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:homePage': 'Site web',
        image: 'Logo',
        'pair:affiliates': 'A pour membres',
        'pair:partnerOf': 'Partenaire de',
        'pair:involvedIn': 'Impliqué dans',
        'pair:hasType': 'Type',
        'pair:hasStatus': 'Statut',
        'pair:hasTopic': 'A pour thème',
        'pair:documentedBy': 'Documenté par',
        'pair:hasLocation': 'Adresse',
        'pair:organizationOfMembership': 'Membres avec Role',
        'pair:membershipActor': 'Membre',
        'pair:membershipRole': 'Role'
      }
    }
  }
};
