import React from 'react';
import { ListWithPermissions } from '@semapps/auth-provider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SimpleList from "../../../common/list/SimpleList";

const StatusList = props => (
  <ListWithPermissions {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record.type}
      leftAvatar={() => <VisibilityIcon />}
    />
  </ListWithPermissions>
);

export default StatusList;
