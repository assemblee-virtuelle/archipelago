import React from 'react';
import { Avatar } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SimpleList from "../../common/list/SimpleList";
import { List } from '../../common/layout';

const PageList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['semapps:title']}
      leftAvatar={() => (
        <Avatar width="100%">
          <DescriptionIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </List>
);

export default PageList;
