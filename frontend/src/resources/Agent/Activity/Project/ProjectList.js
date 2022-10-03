import React from 'react';
import { ListWithPermissions } from '@semapps/auth-provider';
import ProjectFilterSidebar from './ProjectFilterSidebar';
import { Avatar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SimpleList from "../../../../common/list/SimpleList";

const ProjectList = props => (
  <ListWithPermissions aside={<ProjectFilterSidebar />} {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:comment']}
      leftAvatar={() => (
        <Avatar width="100%">
          <SettingsIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </ListWithPermissions>
);

export default ProjectList;
