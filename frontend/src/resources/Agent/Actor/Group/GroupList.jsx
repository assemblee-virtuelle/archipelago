import React from 'react';
import { Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { List } from '../../../../layout';
import SimpleList from "../../../../common/list/SimpleList";

const GroupList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:comment']}
      leftAvatar={() => (
        <Avatar width="100%">
          <GroupIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </List>
);

export default GroupList;
