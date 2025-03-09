import React, { PropsWithChildren } from 'react';
import { CreateProps, useCreateContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useGetCreateContainerUri } from '@semapps/semantic-data-provider';
import { useLayoutContext } from '../../../layouts/LayoutContext';

type Props = {
  title?: CreateProps['title'];
  actions: JSX.Element;
};

const CreateView = ({ title, actions, children }: PropsWithChildren<Props>) => {
  const createContext = useCreateContext();
  const createContainerUri = useGetCreateContainerUri()(createContext.resource);

  useCheckPermissions(createContainerUri, 'create');

  const Layout = useLayoutContext();

  return(
    <Layout.BaseView title={title ?? createContext.defaultTitle} actions={actions}>
      {children}
    </Layout.BaseView>
  )
};

export default CreateView;
