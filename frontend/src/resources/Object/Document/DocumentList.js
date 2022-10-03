import React from 'react';
import { ListWithPermissions } from '@semapps/auth-provider';
import DescriptionIcon from '@material-ui/icons/Description';
import SimpleList from "../../../common/list/SimpleList";

const DocumentList = props => (
  <ListWithPermissions {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <DescriptionIcon />} linkType="show" />
  </ListWithPermissions>
);

export default DocumentList;
