import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";

const DocumentList = props => (
  <List {...props}>
    <SimpleList primaryText={record => record['pair:label']} leftAvatar={() => <DescriptionIcon />} linkType="show" />
  </List>
);

export default DocumentList;
