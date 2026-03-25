import { lazy } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/Class';
import RoleList from './RoleList';
import { BaseRecord } from '../..';

export type PairMembershipRoleRecord = BaseRecord & {
  type: 'pair:MembershipRole';
  'pair:label': string;
};

const resource = {
  config: {
    list: RoleList,
    create: lazy(() => import('./RoleCreate')),
    edit: lazy(() => import('./RoleEdit')),
    icon: FavoriteBorderIcon,
    options: {
      label: 'Rôle',
      parent: 'Concept'
    },
    recordRepresentation: (record: PairMembershipRoleRecord) => `${record['pair:label']}`,
  },
  dataModel: {
    types: ['pair:MembershipRole'],
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
      name: 'Rôle |||| Rôles',
      create: 'Ajouter un nouveau rôle',
      fields: {
        'pair:label': 'Nom du rôle'
      }
    }
  }
};

export default resource;
