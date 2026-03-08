import React from 'react';
import { List } from '../../../common/layout';
import TreeList from '../../../common/list/TreeList';

const ThemeList = props => (
  <List perPage={10000} {...props}>
    <TreeList parentKey="pair:broader" labelKey="pair:label" reference="Theme" />
  </List>
);

export default ThemeList;
