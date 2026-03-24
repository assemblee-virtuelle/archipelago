import { lazy } from 'react';
import SkillList from './SkillList';
import SkillShow from './SkillShow';
import PersonIcon from '@mui/icons-material/Person';
import { BaseRecord, ForeignId, ImportableRecord } from '../..';

export type PairSkillRecord = BaseRecord & ImportableRecord & {
  type: 'pair:Skill';
  'pair:label': string;
  'pair:neededBy': ForeignId[];
  'pair:offeredBy': ForeignId[];
};

const resource = {
  config: {
    list: SkillList,
    show: SkillShow,
    create: lazy(() => import('./SkillCreate')),
    edit: lazy(() => import('./SkillEdit')),
    icon: PersonIcon,
    options: {
      label: 'Compétences',

      parent: 'Resource', // Used in tree menu in leftMenu layout
      isImportable: true, // Can this resource be imported from another server
    },
    recordRepresentation: (record: PairSkillRecord) => `${record['pair:label']}`,
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
      create: 'Ajouter une nouvelle compétence',
      fields: {
        'pair:label': 'Nom',
        'pair:offeredBy': 'Proposé par',
        'pair:neededBy': 'Requis par'
      }
    }
  }
};

export default resource;
