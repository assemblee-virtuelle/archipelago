import React, { useMemo } from 'react';
import { IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItemLink, useGetIdentity, useResourceDefinitions } from 'react-admin';

const ResourcesMenu = () => {
  const { data: identity } = useGetIdentity();
  const isLogged = Boolean(identity?.id);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const resourceDefinitions = useResourceDefinitions<{ label: string }>();
  const hiddenResources = useMemo(() => ['Organization', 'Event'], []);
  const resources = useMemo(
    () => Object.values(resourceDefinitions).filter((r) => r.hasList && !hiddenResources.includes(r.name)),
    [resourceDefinitions, hiddenResources],
  );

  if (!isLogged) {
    return null;
  }

  return (
    <>
      <IconButton size="large" edge="start" color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {resources.map(({ name, icon: Icon, options }) => (
          <MenuItemLink
            key={name}
            primaryText={options?.label || name}
            leftIcon={<Icon />}
            to={`/${name}`}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => setAnchorEl(null)}
          />
        ))}
      </Menu>
    </>
  );
};

export default ResourcesMenu;
