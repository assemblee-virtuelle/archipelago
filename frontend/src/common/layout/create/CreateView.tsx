import React, { PropsWithChildren, ReactElement } from 'react';
import { useCreateContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useCreateContainerUri } from '@semapps/semantic-data-provider';
import { BaseView } from '../../../layout';

type Props = {
  title?: string | ReactElement;
  actions: JSX.Element;
};

const CreateView = ({ title, actions, children }: PropsWithChildren<Props>) => {
  const createContext = useCreateContext();
  const createContainerUri = useCreateContainerUri()(createContext.resource);

  // @ts-expect-error Bad typing of Semapps
  useCheckPermissions(createContainerUri || {}, 'create');

  return(
    <BaseView title={title ?? createContext.defaultTitle} actions={actions}>
      {children}
    </BaseView>
  )
};

export default CreateView;
