import CreateOrImport from '../../../common/CreateOrImport';
import SkillEdit from './SkillEdit';
import SkillList from './SkillList';
import SkillShow from './SkillShow';
import PersonIcon from '@mui/icons-material/Person';

export default {
  config: {
    list: SkillList,
    create: CreateOrImport,
    edit: SkillEdit,
    show: SkillShow,
    icon: PersonIcon,
    options: {
      label: 'Compétences',
      parent: 'Resource'
    }
  },
  dataModel: {
    types: ['pair:Skill'],
    list: {
      servers: '@default'
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
