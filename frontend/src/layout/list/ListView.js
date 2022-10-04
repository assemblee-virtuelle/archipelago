import React from 'react';
import { useListContext, Pagination } from 'react-admin';
import { Box } from '@material-ui/core';
import BaseView from "../BaseView";

const ListView = ({ title, children, aside, actions }) => {
  const listContext = useListContext();
  return(
    <BaseView title={title} actions={actions} aside={aside} context={listContext}>
      <Box p={3}>
        {React.cloneElement(children, {
          ...listContext,
          ...children.props
        })}
      </Box>
      <Pagination />
    </BaseView>
  )
};

export default ListView;
