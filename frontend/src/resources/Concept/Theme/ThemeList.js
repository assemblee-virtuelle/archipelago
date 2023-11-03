import React from 'react';
import List from "../../../layout/list/List";
import TreeList from '../../../common/list/TreeList';

const ThemeList = props => (
  <List {...props}>
    <TreeList source="pair:broader" label="pair:label" defaultExpanded={false} reference="Theme" />
  </List>
);

export default ThemeList;
