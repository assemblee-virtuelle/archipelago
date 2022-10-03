import React from 'react';
import { useShowContext } from 'react-admin';
import { Box } from '@material-ui/core';
import { useCheckPermissions } from '@semapps/auth-provider';
import { ShowActions } from "@semapps/auth-provider";
import BaseView from "./BaseView";

const ShowView = ({ title, children }) => {
  const showContext = useShowContext();
  const permissions = useCheckPermissions(showContext?.record?.id, 'show');
  if( !permissions ) return null;
  return(
    <BaseView title={title} actions={<ShowActions />} context={showContext}>
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
