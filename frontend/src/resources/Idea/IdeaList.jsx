import React from 'react';
import IdeaFilterSidebar from './IdeaFilterSidebar';
import { Avatar } from '@mui/material';
import IdeaIcon from '@mui/icons-material/EmojiObjects';
import SimpleList from "../../common/list/SimpleList";
import { List } from '../../common/layout';

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
