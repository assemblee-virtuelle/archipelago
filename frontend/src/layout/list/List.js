import React from 'react';
import { ListBase } from 'react-admin';
import ListView from "./ListView";
import ListActionsWithViewsAndPermissions from "./ListActionsWithViewsAndPermissions";

const List = ({ actions, aside, pagination, children, ...rest }) => (
  <ListBase {...rest}>
    <ListView aside={aside} actions={<ListActionsWithViewsAndPermissions />} pagination={pagination}>
      {children}
    </ListView>
  </ListBase>
);

export default List;
