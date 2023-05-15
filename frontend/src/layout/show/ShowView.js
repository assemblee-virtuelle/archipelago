import React from 'react';
import { useShowContext } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import BaseView from "../BaseView";

const ShowView = ({ title, actions, children }) => {
  const showContext = useShowContext();
  useCheckPermissions(showContext?.record?.id, 'show');
  return(
    <BaseView title={title} actions={actions} context={showContext}>
      <Box p={3}>
        {children}
      </Box>
    </BaseView>
  )
};

export default ShowView;
