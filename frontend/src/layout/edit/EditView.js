import React from 'react';
import { useEditContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { EditActions, EditToolbarWithPermissions } from "@semapps/auth-provider";
import BaseView from "../BaseView";

const EditView = ({ title, children }) => {
  const editContext = useEditContext();
  useCheckPermissions(editContext?.record?.id, 'edit');
  return(
    <BaseView title={title} actions={<EditActions />} context={editContext}>
      {React.cloneElement(children, {
        toolbar: <EditToolbarWithPermissions />,
        ...editContext,
        ...children.props
      })}
    </BaseView>
  )
};

export default EditView;