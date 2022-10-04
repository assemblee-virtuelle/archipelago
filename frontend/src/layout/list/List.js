import React from 'react';
import { ListBase } from 'react-admin';
import ListView from "./ListView";
import ListActionsWithViewsAndPermissions from "./ListActionsWithViewsAndPermissions";

const List = ({ actions, aside, children, ...rest }) => (
  <ListBase {...rest}>
    <ListView aside={aside} actions={actions}>
      {children}
    </ListView>
  </ListBase>
);

List.defaultProps = {
  actions: <ListActionsWithViewsAndPermissions />
}

export default List;
