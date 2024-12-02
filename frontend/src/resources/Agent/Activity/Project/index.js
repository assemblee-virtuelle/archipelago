import CreateOrImport from '../../../../common/CreateOrImport';
import ProjectEdit from './ProjectEdit';
import ProjectList from './ProjectList';
import ProjectShow from './ProjectShow';
import SettingsIcon from '@mui/icons-material/Settings';

const resource = {
  config: {
    list: ProjectList,
    show: ProjectShow,
    create: CreateOrImport,
    edit: ProjectEdit,
    icon: SettingsIcon,
    options: {
      label: 'Projets',
      parent: 'Activity'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
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
      fields: {
        'pair:label': 'Nom',
        'pair:comment': 'Courte description',
        'pair:description': 'Description',
        'pair:hasStatus': 'Statut',
        'pair:homePage': 'Site web',
        'pair:involves': 'Implique',
        'pair:needs': 'Compétences requises',
        'pair:documentedBy': 'Documenté par',
        'pair:hasTopic': 'A pour thème',
        'pair:hasType': 'Type',
      }
    }
  }
};

export default resource;
