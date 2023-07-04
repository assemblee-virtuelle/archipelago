import React from 'react';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/Class';
import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";

const RoleList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      leftAvatar={() => (
        <Avatar width="100%">
          <FavoriteBorderIcon />
        </Avatar>
      )}
    />
  </List>
);

export default RoleList;
