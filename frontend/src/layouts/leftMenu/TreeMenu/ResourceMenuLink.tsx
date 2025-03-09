import React from 'react';
import { MenuItemLink, useSidebarState } from 'react-admin';
import DefaultIcon from '@mui/icons-material/ViewList';

type Props = {
  resource: {
    name: string;
    icon?: React.ElementType;
    options?: {
      label: string;
    };
  };
  root?: boolean;
};

const ResourceMenuLink = ({ resource, root }: Props) => {
  const [sidebarIsOpen] = useSidebarState();

  return (
    <MenuItemLink
      to={`/${resource.name}`}
      primaryText={resource.options?.label || resource.name}
      leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
      sx={{
        paddingLeft: root || !sidebarIsOpen ? 2 : 4,
        transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
      }}
    />
  );
};

export default ResourceMenuLink;
