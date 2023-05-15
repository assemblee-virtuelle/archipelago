import React from 'react';
import { useListContext, Pagination } from 'react-admin';
import { Box } from '@mui/material';
import BaseView from "../BaseView";

const ListView = ({ title, children, aside, actions }) => {
  const listContext = useListContext();
  return(
    <BaseView title={title} actions={actions} aside={aside} context={listContext}>
      <Box p={3}>
        {children}
      </Box>
      <Pagination />
    </BaseView>
  )
};

export default ListView;
