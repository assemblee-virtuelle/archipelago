import React from 'react';
import { useEditContext, useResourceContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { EditToolbarWithPermissions } from "@semapps/auth-provider";
import { useDataModel } from '@semapps/semantic-data-provider';
import BaseView from "../BaseView";

const EditView = ({ title, actions, children }) => {
  const editContext = useEditContext();
  useCheckPermissions(editContext?.record?.id, 'edit');

  const resource = useResourceContext({});
  const dataModel = useDataModel(resource);

  const recordTitle = editContext?.record?.[dataModel?.fieldsMapping?.title] || '';

  return(
    <BaseView title={title || recordTitle} actions={actions} context={editContext}>
      {React.cloneElement(children, {
        toolbar: <EditToolbarWithPermissions />
      })}
    </BaseView>
  )
};

export default EditView;
