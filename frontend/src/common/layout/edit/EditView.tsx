import React, { PropsWithChildren, ReactElement } from 'react';
import { RaRecord, useEditContext, useGetRecordRepresentation, useResourceContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useLayoutContext } from '../../../layouts/LayoutContext';

type Props = {
  title?: string | ReactElement;
  actions: JSX.Element;
};

const EditView = ({ title, actions, children }: PropsWithChildren<Props>) => {
  const editContext = useEditContext<RaRecord<string>>();

  // @ts-expect-error Bad typing of Semapps
  useCheckPermissions(editContext?.record?.id || {}, 'edit');

  const resource = useResourceContext();
  const getRecordRepresentation = useGetRecordRepresentation(resource);

  const recordTitle = getRecordRepresentation(editContext?.record);

  const Layout = useLayoutContext();

  return (
    <Layout.BaseView title={title || recordTitle} actions={actions}>
      {children}
    </Layout.BaseView>
  );
};

export default EditView;
