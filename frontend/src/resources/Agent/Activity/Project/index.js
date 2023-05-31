import CreateOrImport from '../../../../common/CreateOrImport';
import ProjectEdit from './ProjectEdit';
import ProjectList from './ProjectList';
import ProjectShow from './ProjectShow';
import SettingsIcon from '@material-ui/icons/Settings';

export default {
  config: {
    list: ProjectList,
    show: ProjectShow,
    create: CreateOrImport,
    edit: ProjectEdit,
    icon: SettingsIcon,
    options: {
      label: 'Projets',
      parent: 'Activity'
    }
  },
  dataModel: {
    types: ['pair:Project'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Projet |||| Projets',
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
