import React from 'react';
import { ListWithPermissions } from '@semapps/auth-provider';
import StyleIcon from '@material-ui/icons/Style';
import SimpleList from "../../../common/list/SimpleList";

const TypeList = props => (
  <ListWithPermissions {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record.type}
      leftAvatar={() => <StyleIcon />}
    />
  </ListWithPermissions>
);

export default TypeList;
