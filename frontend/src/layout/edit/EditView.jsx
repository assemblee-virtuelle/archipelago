import React from 'react';
import { useEditContext, useGetRecordRepresentation, useResourceContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { EditToolbarWithPermissions } from "@semapps/auth-provider";
import BaseView from "../BaseView";

const EditView = ({ title, actions, children }) => {
  const editContext = useEditContext();
  useCheckPermissions(editContext?.record?.id, 'edit');

  const resource = useResourceContext();
  const getRecordRepresentation = useGetRecordRepresentation(resource);

  const recordTitle = getRecordRepresentation(editContext?.record);

  return(
    <BaseView title={title || recordTitle} actions={actions} context={editContext}>
      {React.cloneElement(children, {
        toolbar: <EditToolbarWithPermissions />
      })}
    </BaseView>
  )
};

export default EditView;
