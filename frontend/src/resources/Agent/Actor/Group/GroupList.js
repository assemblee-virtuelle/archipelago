import React from 'react';
import { Avatar } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import List from "../../../../layout/list/List";
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
