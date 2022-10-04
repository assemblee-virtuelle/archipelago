import React from 'react';
import { EditBase } from 'react-admin';
import { EditActions } from "@semapps/auth-provider";
import EditView from "./EditView";

const Edit = ({ title, actions, children, ...rest }) => (
  <EditBase {...rest}>
    <EditView title={title} actions={actions}>
      {children}
    </EditView>
  </EditBase>
);

Edit.defaultProps = {
  actions: <EditActions />
};

export default Edit;
