import React from 'react';
import { useResourceContext, useShowContext } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useDataModel } from '@semapps/semantic-data-provider';
import BaseView from "../BaseView";

const ShowView = ({ title, actions, children }) => {
  const showContext = useShowContext();
  useCheckPermissions(showContext?.record?.id, 'show');

  const resource = useResourceContext({});
  const dataModel = useDataModel(resource);

  const recordTitle = showContext?.record?.[dataModel?.fieldsMapping?.title] || '';

  return(
    <BaseView title={title || recordTitle} actions={actions} context={showContext}>
      <Box p={3}>
        {children}
      </Box>
    </BaseView>
  )
};

export default ShowView;
