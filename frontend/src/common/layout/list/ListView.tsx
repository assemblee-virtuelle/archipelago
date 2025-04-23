import React, { PropsWithChildren, ReactElement } from 'react';
import { useListContext, Pagination, CreateButton, useResourceDefinition, usePermissions } from 'react-admin';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Permissions, useCheckPermissions } from '@semapps/auth-provider';
import { useGetCreateContainerUri } from '@semapps/semantic-data-provider';
import { useLayoutContext } from '../../../layouts/LayoutContext';

const FloatingCreateButtonBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 10,
  height: '100%',
  pointerEvents: 'none',
  '& .RaCreateButton-floating': {
    position: 'sticky',
    top: 'calc(100% - 56px - 62px)',
    pointerEvents: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

type Props = {
  title?: string | ReactElement;
  actions: JSX.Element;
  aside?: JSX.Element;
  pagination?: JSX.Element | boolean;
};

const ListView = ({ title, children, aside, actions, pagination }: PropsWithChildren<Props>) => {
  const listContext = useListContext();
  const createContainerUri = useGetCreateContainerUri()(listContext.resource);

  // @ts-expect-error Bad typing of Semapps
  useCheckPermissions(createContainerUri || {}, 'list');

  const Layout = useLayoutContext();

  const resourceDefinition = useResourceDefinition();
  const { permissions } = usePermissions(createContainerUri) as { permissions: Permissions };

  return (
    <Layout.BaseView title={title ?? listContext.defaultTitle} actions={actions} aside={aside}>
      <Box px={Layout.name === 'leftMenu' ? 3 : 0} py={3}>
        {children}
      </Box>
      {pagination === false ? null : pagination || <Pagination />}

      {resourceDefinition.hasCreate &&
        permissions &&
        permissions.some((p) => ['acl:Append', 'acl:Write', 'acl:Control'].includes(p['acl:mode'])) && (
          <FloatingCreateButtonBox>
            <CreateButton />
          </FloatingCreateButtonBox>
        )}
    </Layout.BaseView>
  );
};

export default ListView;
