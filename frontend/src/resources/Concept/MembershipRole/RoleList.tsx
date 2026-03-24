import React from 'react';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/Class';
import SimpleList from "../../../common/list/SimpleList";
import { List } from '../../../common/layout';
import { PairMembershipRoleRecord } from '.';

const RoleList = () => (
  <List>
    <SimpleList
      primaryText={(record: PairMembershipRoleRecord) => record['pair:label']}
      leftAvatar={() => (
        <Avatar sx={{width: '100%'}}>
          <FavoriteBorderIcon />
        </Avatar>
      )}
    />
  </List>
);

export default RoleList;
