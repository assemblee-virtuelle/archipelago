import React, { PropsWithChildren } from 'react';
import { EditProps, RaRecord, useEditContext, useGetRecordRepresentation, useResourceContext } from 'react-admin';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useLayoutContext } from '../../../layouts/LayoutContext';

type Props = {
  title?: EditProps['title'];
  actions: JSX.Element;
};

const EditView = ({ title, actions, children }: PropsWithChildren<Props>) => {
  const editContext = useEditContext<RaRecord<string>>();

  useCheckPermissions(editContext?.record?.id, 'edit');

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
