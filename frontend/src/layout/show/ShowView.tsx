import React, { PropsWithChildren, ReactElement } from 'react';
import { RaRecord, useGetRecordRepresentation, useResourceContext, useShowContext } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import BaseView from '../BaseView';

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

  return (
    <BaseView title={title || recordTitle} actions={actions}>
      <Box p={3}>{children}</Box>
    </BaseView>
  );
};

export default ShowView;
