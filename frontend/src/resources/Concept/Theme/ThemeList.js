import React from 'react';
import List from "../../../layout/list/List";
import TreeList from '../../../common/list/TreeList';
import { Pagination } from 'react-admin';

const ThemeList = props => (
  <List perPage={10000} {...props}>
    <TreeList source="pair:broader" label="pair:label" defaultExpanded={false} reference="Theme" />
  </List>
);

export default ThemeList;
