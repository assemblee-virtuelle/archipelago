import React from 'react';
import { ListBase } from 'react-admin';
import ListView from "./ListView";
import ListActions from "./ListActions";

const List = ({ actions, aside, children, ...rest }) => (
  <ListBase {...rest}>
    <ListView aside={aside} actions={actions}>
      {children}
    </ListView>
  </ListBase>
);

List.defaultProps = {
  actions: <ListActions />
}

export default List;
