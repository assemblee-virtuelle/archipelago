import React from 'react';
import { MenuItemLink, useSidebarState } from 'react-admin';
import { MenuList, Collapse, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMore from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(theme => ({
  sidebarIsOpen: {
    '& a': {
      paddingLeft: theme.spacing(4),
      transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
    }
  },
  sidebarIsClosed: {
    '& a': {
      paddingLeft: theme.spacing(2),
      transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
    }
  }
}));

const SubMenu = ({ handleToggle, isOpen, name, icon, children }) => {
  const classes = useStyles();
  const [sidebarIsOpen, setSidebarIsOpen] = useSidebarState();

  const header = (
    <MenuItemLink
      to={`/${name}`}
      primaryText={name}
      leftIcon={isOpen ? <ExpandMore /> : icon}
      onClick={(e) => {
        e.preventDefault();
        setSidebarIsOpen(true);
        handleToggle();
      }}
    />
  );

  return (
    <>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={name} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <MenuList
          component="div"
          disablePadding
          className={sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed}
        >
          {children}
        </MenuList>
      </Collapse>
    </>
  );
};

export default SubMenu;
