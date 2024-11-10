import React, { Suspense } from 'react';
import { LayoutProps } from 'react-admin';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLayoutContext } from '../../layouts/LayoutContext';

const FullPageBox = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const BaseLayout = (props: LayoutProps) => {
  const { Layout } = useLayoutContext();

  return (
    <Suspense
      fallback={
        <FullPageBox>
          <CircularProgress />
        </FullPageBox>
      }
    >
      <Layout {...props} />
    </Suspense>
  );
};

export default BaseLayout;
