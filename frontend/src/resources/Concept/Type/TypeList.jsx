import React from 'react';
import StyleIcon from '@mui/icons-material/Style';
import SimpleList from "../../../common/list/SimpleList";
import { List } from '../../../common/layout';

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
