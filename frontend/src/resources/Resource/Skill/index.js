import CreateOrImport from '../../../common/CreateOrImport';
import SkillEdit from './SkillEdit';
import SkillList from './SkillList';
import SkillShow from './SkillShow';
import PersonIcon from '@mui/icons-material/Person';

const resource = {
  config: {
    list: SkillList,
    create: CreateOrImport,
    edit: SkillEdit,
    show: SkillShow,
    icon: PersonIcon,
    options: {
      label: 'Compétences',
      parent: 'Resource'
    },
    recordRepresentation: (record) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:Skill'],
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
      name: 'Compétence |||| Compétences',
      fields: {
        'pair:label': 'Titre',
        'pair:offeredBy': 'Proposé par',
        'pair:neededBy': 'Requis par'
      }
    }
  }
};

export default resource;
