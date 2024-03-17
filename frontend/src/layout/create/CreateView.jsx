import React from 'react';
import { useCreateContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useCreateContainer } from '@semapps/semantic-data-provider';
import BaseView from "../BaseView";

const CreateView = ({ title, actions, children }) => {
  const createContext = useCreateContext({ defaultTitle: title });
  const createContainerUri = useCreateContainer(createContext.resource);
  useCheckPermissions(createContainerUri, 'create');
  return(
    <BaseView title={title} actions={actions} context={createContext}>
      {children}
    </BaseView>
  )
};

export default CreateView;
