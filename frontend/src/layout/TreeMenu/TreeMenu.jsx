/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useMemo } from "react";
import { useResourceDefinitions, Logout, Menu, useGetIdentity, MenuItemLink, useTranslate } from "react-admin";
import { useLocation } from "react-router";
import { useMediaQuery, Divider } from "@mui/material";
import DefaultIcon from "@mui/icons-material/ViewList";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import SubMenu from "./SubMenu";
import ResourceMenuLink from "./ResourceMenuLink";

const TreeMenu = () => {
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const resourceDefinitions = useResourceDefinitions();
  const resources = useMemo(
    () => Object.values(resourceDefinitions),
    [resourceDefinitions]
  );

  const location = useLocation();
  const matches = location.pathname.match(/^\/([^/]+)/);
  const currentResourceName = matches ? matches[1] : null;

  const { identity } = useGetIdentity();
  const isLogged = identity && identity.id !== '';

  const translate = useTranslate();

  const [openSubMenus, setOpenSubMenus] = useState({});
  const handleToggle = (menu) => {
    setOpenSubMenus((state) => ({ ...state, [menu]: !state[menu] }));
  };

  // Get menu root items
  const menuRootItems = useMemo(
    () => resources.filter((r) => !r.options?.parent),
    [resources]
  );

  // Calculate available categories
  const categories = useMemo(() => {
    const names = resources.reduce((categories, resource) => {
      if (resource.options?.parent) {
        categories.push(resource.options.parent);
      }
      return categories;
    }, []);
    return resources.filter((resource) => names.includes(resource.name));
  }, [resources]);

  // Open submenu of current page
  useEffect(() => {
    const currentResource = resources.find(
      (resource) => resource.name === currentResourceName
    );

    const currentCategory =
      currentResource &&
      categories.find(
        (category) => category.name === currentResource.options?.parent
      );

    if (currentCategory) {
      setOpenSubMenus((state) => ({ ...state, [currentCategory.name]: true }));
    }
  }, [categories, resources, currentResourceName]);

  const menuItems = menuRootItems.map((menuRootItem) => {
    return categories.includes(menuRootItem) ? (
      <SubMenu
        key={menuRootItem.name}
        handleToggle={() => handleToggle(menuRootItem.name)}
        isOpen={openSubMenus[menuRootItem.name]}
        name={(menuRootItem.options && menuRootItem.options.label) || menuRootItem.name}
        icon={menuRootItem.icon ? <menuRootItem.icon /> : <DefaultIcon />}
      >
        {resources
          .filter(resource => resource.hasList && resource.options.parent === menuRootItem.name)
          .map(resource => (
            <ResourceMenuLink key={resource.name} resource={resource} />
          ))}
      </SubMenu>
    ) : (
      menuRootItem.hasList && (
        <ResourceMenuLink key={menuRootItem.name} resource={menuRootItem} />
      )
    );
  });

  if (isXSmall) {
    menuItems.push(<Divider key="divider" />);

    if (isLogged) {
      menuItems.push(<Logout key="logout" />)
    } else {
      menuItems.push(
        <MenuItemLink
          key="signup"
          to={'/login?signup=true'}
          primaryText={translate('auth.action.signup')}
          leftIcon={<LockOpenIcon />}
        />,
        <MenuItemLink
          key="login"
          to={'/login'}
          primaryText={translate('auth.action.login')}
          leftIcon={<LoginIcon />}
        />,
      );
    }
  }

  return <Menu children={menuItems} />;
};

export default TreeMenu;
