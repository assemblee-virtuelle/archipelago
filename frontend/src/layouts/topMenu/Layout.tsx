import React, { PropsWithChildren } from 'react';
import AppBar from './AppBar';
import { Box } from '@mui/material';
import BottomNavigation from './BottomNavigation';
import { useLayoutContext } from '../LayoutContext';
import { LayoutOptions } from '.';

const Layout = ({ children }: PropsWithChildren) => {
  const layout = useLayoutContext<LayoutOptions>();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      paddingBottom: { xs: '56px', md: 0 }
    }}>
      <AppBar />

      <Box
        component={'main'}
        sx={{
          paddingX: { xs: 1, md: 2 },
          paddingBottom: { xs: 5, md: 0 },
          marginBottom: { xs: 1, md: 0 },
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}
      >
        {children}
      </Box>

      {layout.options.footer?.()}

      <BottomNavigation />
    </Box>
  );
};

export default Layout;
