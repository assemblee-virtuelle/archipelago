import React, { PropsWithChildren, ReactElement } from 'react';
import { useListContext, Pagination } from 'react-admin';
import { Box } from '@mui/material';
import { useCheckPermissions } from '@semapps/auth-provider';
import { useCreateContainerUri } from '@semapps/semantic-data-provider';
import { BaseView } from '../../../layout';

type Props = {
  title?: string | ReactElement;
  actions: JSX.Element;
  aside?: JSX.Element;
  pagination?: JSX.Element | boolean;
};

const ListView = ({ title, children, aside, actions, pagination }: PropsWithChildren<Props>) => {
  const listContext = useListContext();
  const createContainerUri = useCreateContainerUri()(listContext.resource);

  // @ts-expect-error Bad typing of Semapps
  useCheckPermissions(createContainerUri || {}, 'list');

  return (
    <BaseView title={title ?? listContext.defaultTitle} actions={actions} aside={aside}>
      <Box p={3}>{children}</Box>
      {pagination === false ? null : pagination || <Pagination />}
    </BaseView>
  );
};

export default ListView;
