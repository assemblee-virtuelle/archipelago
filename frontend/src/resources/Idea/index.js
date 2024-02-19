import CreateOrImport from '../../common/CreateOrImport';
import IdeaEdit from './IdeaEdit';
import IdeaList from './IdeaList';
import IdeaShow from './IdeaShow';
import IdeaIcon from '@mui/icons-material/EmojiObjects';

export default {
  config: {
    list: IdeaList,
    show: IdeaShow,
    create: CreateOrImport,
    edit: IdeaEdit,
    icon: IdeaIcon,
    options: {
      label: 'Idées'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Idea'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Idée |||| Idées',
      fields: {
        'pair:label': 'Titre',
        'pair:description': 'Description',
        // about -> [Subject]
        'pair:brainstormedBy': 'Imaginée par' /*Actor*/,
        'pair:concretizedBy': 'Concrétisée par' /*Activity*/,
        'pair:hasType': 'Type',
        'pair:hasStatus': 'Statut',
        'pair:comment': 'Courte description'
      }
    }
  }
};
