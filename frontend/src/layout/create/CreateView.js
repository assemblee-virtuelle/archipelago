import React from 'react';
import { useCreateContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useCreateContainer } from '@semapps/semantic-data-provider';
import BaseView from "../BaseView";

const CreateView = ({ title, actions, children }) => {
  const createContext = useCreateContext();
  const createContainerUri = useCreateContainer(createContext.resource);
  useCheckPermissions(createContainerUri, 'create');
  return(
    <BaseView title={title} actions={actions} context={createContext}>
      {React.cloneElement(children, {
        ...createContext,
        ...children.props
      })}
    </BaseView>
  )
};

export default CreateView;
