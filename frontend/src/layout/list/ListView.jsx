import React from 'react';
import { useListContext, Pagination } from 'react-admin';
import { Box } from '@mui/material';
import BaseView from "../BaseView";

const ListView = ({ title, children, aside, actions, pagination }) => {
  const listContext = useListContext();
  return(
    <BaseView title={title} actions={actions} aside={aside} context={listContext}>
      <Box p={3}>
        {children}
      </Box>
      {pagination === false ? null : pagination}
    </BaseView>
  )
};

ListView.defaultProps = {
  pagination: <Pagination />
};

export default ListView;
