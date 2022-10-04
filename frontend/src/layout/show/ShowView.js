import React from 'react';
import { useShowContext } from 'react-admin';
import { Box } from '@material-ui/core';
import { useCheckPermissions } from '@semapps/auth-provider';
import BaseView from "../BaseView";

const ShowView = ({ title, actions, children }) => {
  const showContext = useShowContext();
  useCheckPermissions(showContext?.record?.id, 'show');
  return(
    <BaseView title={title} actions={actions} context={showContext}>
      <Box p={3}>
        {React.cloneElement(children, {
          ...showContext,
          ...children.props
        })}
      </Box>
    </BaseView>
  )
};

export default ShowView;
