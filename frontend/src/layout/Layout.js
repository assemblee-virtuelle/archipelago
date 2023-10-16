import React from 'react';
import { Layout as RaLayout } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';

const useStyles = makeStyles(theme => ({
  layout: {
    '& .RaLayout-content': {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
      '& a:not(.MuiListItemButton-root):not(.MuiButtonBase-root)': {
        overflowWrap: 'break-word',
        color: theme.palette.primary.main
      }
    }
  }
}));

const Layout = ({ appBar, menu, children, ...otherProps }) => {
  const classes = useStyles();
  return (
    <RaLayout
      {...otherProps}
      className={classes.layout}
      appBar={AppBar}
      menu={TreeMenu}
    >
      {children}
    </RaLayout>
  );
};

export default Layout;
