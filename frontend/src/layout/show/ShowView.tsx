import React, { PropsWithChildren, ReactElement } from 'react';
import { RaRecord, useGetRecordRepresentation, useResourceContext, useShowContext } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useLayoutContext } from '../../layouts/LayoutContext';

type Props = {
  title?: string | ReactElement;
  actions: JSX.Element;
};

const ShowView = ({ title, actions, children }: PropsWithChildren<Props>) => {
  const showContext = useShowContext<RaRecord<string>>();

  // @ts-expect-error Bad typing of Semapps
  useCheckPermissions(showContext?.record?.id || {}, 'show');

  const resource = useResourceContext();
  const getRecordRepresentation = useGetRecordRepresentation(resource);

  const recordTitle = getRecordRepresentation(showContext?.record);

  const Layout = useLayoutContext();

  return (
    <Layout.BaseView title={title || recordTitle} actions={actions}>
      <Box p={3}>{children}</Box>
    </Layout.BaseView>
  );
};

export default ShowView;
