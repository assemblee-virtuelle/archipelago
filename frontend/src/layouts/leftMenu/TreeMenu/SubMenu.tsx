import React, { PropsWithChildren } from 'react';
import { MenuItemLink, useSidebarState } from 'react-admin';
import { MenuList, Collapse, Tooltip } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';

type Props = {
  handleToggle: () => void;
  isOpen: boolean;
  name: string;
  icon: JSX.Element;
};

const SubMenu = ({ handleToggle, isOpen, name, icon, children }: PropsWithChildren<Props>) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useSidebarState();

  const header = (
    <MenuItemLink
      to={`/${name}`}
      primaryText={name}
      leftIcon={isOpen ? <ExpandMore /> : icon}
      onClick={(e: Event) => {
        e.preventDefault();
        setSidebarIsOpen(true);
        handleToggle();
      }}
      sx={{ paddingLeft: 2 }}
    />
  );

  return (
    <>
      <Tooltip title={sidebarIsOpen || isOpen ? undefined : name} placement="right">
        {header}
      </Tooltip>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <MenuList component="div" disablePadding>
          {children}
        </MenuList>
      </Collapse>
    </>
  );
};

export default SubMenu;
