import React from 'react';
import { List } from '../../../common/layout';
import TreeList from '../../../common/list/TreeList';

const ThemeList = () => (
  <List perPage={10000}>
    <TreeList parentKey="pair:broader" labelKey="pair:label" reference="Theme" />
  </List>
);

export default ThemeList;
