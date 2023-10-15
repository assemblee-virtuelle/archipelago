import React from 'react';
import { useGetRecordRepresentation, useResourceContext, useShowContext } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import BaseView from "../BaseView";

const ShowView = ({ title, actions, children }) => {
  const showContext = useShowContext();
  useCheckPermissions(showContext?.record?.id, 'show');

  const resource = useResourceContext();
  const getRecordRepresentation = useGetRecordRepresentation(resource);

  const recordTitle = getRecordRepresentation(showContext?.record);

  return(
    <BaseView title={title || recordTitle} actions={actions} context={showContext}>
      <Box p={3}>
        {children}
      </Box>
    </BaseView>
  )
};

export default ShowView;
