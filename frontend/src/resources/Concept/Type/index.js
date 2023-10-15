import TypeCreate from './TypeCreate';
import TypeEdit from './TypeEdit';
import TypeList from './TypeList';
import StyleIcon from '@mui/icons-material/Style';

export default {
  config: {
    list: TypeList,
    create: TypeCreate,
    edit: TypeEdit,
    icon: StyleIcon,
    options: {
      label: 'Types',
      parent: 'Concept'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: [
      'pair:Type',
      'pair:ActivityType',
      'pair:AgentType',
      'pair:ConceptType',
      'pair:DocumentType',
      'pair:EventType',
      'pair:FolderType',
      'pair:GroupType',
      'pair:IdeaType',
      'pair:ObjectType',
      'pair:OrganizationType',
      'pair:PlaceType',
      'pair:ProjectType',
      'pair:ResourceType',
      'pair:SubjectType',
      'pair:TaskType'
    ],
    list: {
      servers: '@default',
      blankNodes: []
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Type |||| Types',
      fields: {
        '@type': 'Classe',
        'pair:label': 'Nom'
      }
    }
  }
};
