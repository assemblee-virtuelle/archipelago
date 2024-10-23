import React from 'react';
import { LayoutProps, Layout as RaLayout } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';

const Layout = ({ children, ...otherProps }: LayoutProps) => {
  const theme = useTheme();

  return (
    <RaLayout
      {...otherProps}
      appBar={AppBar}
      menu={TreeMenu}
      sx={{
        '& .RaLayout-content': {
          padding: { xs: 1, sm: theme.spacing(1, 2, 2, 1) },
        },
        '& a:not(.MuiListItemButton-root):not(.MuiButtonBase-root)': {
          overflowWrap: 'break-word',
          color: 'primary.main',
        },
      }}
    >
      {children}
    </RaLayout>
  );
};

export default Layout;
