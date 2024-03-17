import React from 'react';
import { MenuItemLink } from 'react-admin';
import DefaultIcon from '@mui/icons-material/ViewList';

const ResourceMenuLink = ({ resource }) => (
  <MenuItemLink
    to={`/${resource.name}`}
    primaryText={resource.options?.label || resource.name}
    leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
  />
);

export default ResourceMenuLink;
