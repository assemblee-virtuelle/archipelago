import React from 'react';
import IdeaFilterSidebar from './IdeaFilterSidebar';
import { Avatar } from '@material-ui/core';
import IdeaIcon from '@material-ui/icons/EmojiObjects';
import SimpleList from "../../common/list/SimpleList";
import List from "../../layout/list/List";

const IdeaList = props => (
  <List aside={<IdeaFilterSidebar />} {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:comment']}
      leftAvatar={() => (
        <Avatar width="100%">
          <IdeaIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </List>
);

export default IdeaList;
