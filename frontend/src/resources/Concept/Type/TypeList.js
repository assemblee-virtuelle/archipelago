import React from 'react';
import StyleIcon from '@material-ui/icons/Style';
import SimpleList from "../../../common/list/SimpleList";
import List from "../../../layout/list/List";

const TypeList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record.type}
      leftAvatar={() => <StyleIcon />}
    />
  </List>
);

export default TypeList;
