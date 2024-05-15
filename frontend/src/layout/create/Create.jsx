import React from 'react';
import { CreateActions, CreateBase } from 'react-admin';
import CreateView from "./CreateView";

const Create = ({ title, actions, children, ...rest }) => (
  <CreateBase {...rest}>
    <CreateView actions={actions} title={title}>
      {children}
    </CreateView>
  </CreateBase>
);

Create.defaultProps = {
  actions: <CreateActions />
};

export default Create;
