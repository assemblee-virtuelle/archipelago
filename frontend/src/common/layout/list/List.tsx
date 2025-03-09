import React from 'react';
import { ListBase, ListProps, TopToolbar } from 'react-admin';
import { ListActionsWithPermissions } from '@semapps/auth-provider';
import { ViewsButtons } from '@semapps/list-components';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ListView } from '../index';

const ActionsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row-reverse',
  },
}));

const List = ({ aside, pagination, children, ...rest }: ListProps) => (
  <ListBase {...rest}>
    <ListView
      aside={aside}
      actions={
        <ActionsBox>
          <TopToolbar>
            <ViewsButtons />
          </TopToolbar>
          <ListActionsWithPermissions
            exporter={false}
            displayedFilters={undefined}
            filters={undefined}
            filterValues={undefined}
            showFilter={undefined}
            total={undefined}
          />
        </ActionsBox>
      }
      pagination={pagination}
    >
      {children}
    </ListView>
  </ListBase>
);

export default List;
