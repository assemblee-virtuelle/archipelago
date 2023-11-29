import React from 'react';
import { useListContext, Pagination, useResourceContext } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useCreateContainer } from '@semapps/semantic-data-provider';
import BaseView from "../BaseView";

const ListView = ({ title, children, aside, actions, pagination }) => {
  const listContext = useListContext();

  const resource = useResourceContext();
  const containerUri = useCreateContainer(resource);

  useCheckPermissions(containerUri, 'list');

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
