import React, { PropsWithChildren, ReactElement } from 'react';
import { useCreateContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useCreateContainerUri } from '@semapps/semantic-data-provider';
import { useLayoutContext } from '../../../layouts/LayoutContext';

type Props = {
  title?: string | ReactElement;
  actions: JSX.Element;
};

const CreateView = ({ title, actions, children }: PropsWithChildren<Props>) => {
  const createContext = useCreateContext();
  const createContainerUri = useCreateContainerUri()(createContext.resource);

  // @ts-expect-error Bad typing of Semapps
  useCheckPermissions(createContainerUri || {}, 'create');

  const Layout = useLayoutContext();

  return(
    <Layout.BaseView title={title ?? createContext.defaultTitle} actions={actions}>
      {children}
    </Layout.BaseView>
  )
};

export default CreateView;
