import React from 'react';
import { EditBase } from 'react-admin';
import { EditActionsWithPermissions } from "@semapps/auth-provider";
import EditView from "./EditView";

const Edit = ({ title, actions, children, ...rest }) => (
  <EditBase {...rest}>
    <EditView title={title} actions={actions}>
      {children}
    </EditView>
  </EditBase>
);

Edit.defaultProps = {
  actions: <EditActionsWithPermissions />
};

export default Edit;
