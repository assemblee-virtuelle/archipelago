import React from 'react';
import { Avatar } from '@material-ui/core';
import { ListWithPermissions } from '@semapps/auth-provider';
import DescriptionIcon from '@material-ui/icons/Description';
import SimpleList from "../../common/list/SimpleList";

const PageList = props => (
  <ListWithPermissions {...props}>
    <SimpleList
      primaryText={record => record['semapps:title']}
      leftAvatar={() => (
        <Avatar width="100%">
          <DescriptionIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </ListWithPermissions>
);

export default PageList;
