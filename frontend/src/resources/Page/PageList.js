import React from 'react';
import { Avatar } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import SimpleList from "../../common/list/SimpleList";
import List from "../../layout/list/List";

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
