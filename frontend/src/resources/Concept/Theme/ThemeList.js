import React from 'react';
import List from "../../../layout/list/List";
import TreeList from '../../../common/list/TreeList';

const ThemeList = props => (
  <List perPage={1000} {...props}>
    <TreeList source="pair:broader" label="pair:label" defaultExpanded={false} />
  </List>
);

export default ThemeList;
