import React, { useMemo } from 'react';
import { Layout as RaLayout } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';

const useStyles = makeStyles(theme => ({
  layout: {
    '& .RaLayout-content': {
      backgroundColor: '#efefef',
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        marginBottom: 80,
      },
      maxWidth: '100vw',
      '& a:not(.MuiListItemButton-root):not(.MuiButtonBase-root)': {
        overflowWrap: 'break-word',
        color: theme.palette.primary.main
      },
      [theme.breakpoints.up('sm')]: {
        '& > .MuiGrid-container > div': {
          flexBasis: '100%',
          maxWidth: '100%'
        },
      },
    }
  }
}));

const Layout = ({ appBar, menu, userMenu, children, labelNbLines, ...otherProps }) => {
  const classes = useStyles();
  const LayoutTreeMenu = useMemo(() => props => <TreeMenu {...props} labelNbLines={labelNbLines} />, [labelNbLines]);
  return (
    <RaLayout
      {...otherProps}
      className={classes.layout}
      appBar={appBar}
      menu={menu ? menu : LayoutTreeMenu}
    >
      {children}
    </RaLayout>
  );
};

Layout.defaultProps = {
  appBar: AppBar
};

export default Layout;
