import React, { PropsWithChildren } from 'react';
import AppBar from './AppBar';
import { Box } from '@mui/material';
import BottomNavigation from './BottomNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <AppBar />

      <Box sx={{ paddingX: { xs: 1, md: 2 }, marginTop: '64px', marginBottom: { xs: 8, md: 0 } }}>
        {children}
      </Box>

      <BottomNavigation />
    </Box>
  );
};

export default Layout;
