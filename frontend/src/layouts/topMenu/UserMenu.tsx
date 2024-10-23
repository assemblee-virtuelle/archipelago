import React, { forwardRef } from 'react';
import { Logout, UserMenu as RaUserMenu, useCreatePath, useGetIdentity, useUserMenu } from 'react-admin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material';

type Props = MenuItemProps & {
  label: string;
  icon?: React.ElementType;
  to: string;
};

const UserMenuItem = forwardRef(function UserMenuItem({ label, icon: IconComponent, to, ...rest }: Props, ref) {
  const { onClose } = useUserMenu();

  return (
    <MenuItem component={Link} href={to} onClick={onClose} ref={ref} {...rest}>
      {IconComponent && (
        <ListItemIcon>
          <IconComponent fontSize="small" />
        </ListItemIcon>
      )}
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
});

const UserMenu = () => {
  const { data: identity } = useGetIdentity();
  const createPath = useCreatePath();

  return (
    <RaUserMenu>
      {identity?.id
        ? [
            <UserMenuItem
              key="view"
              label="Voir mon profil"
              icon={AccountCircleIcon}
              to={createPath({ resource: 'Person', id: identity.id, type: 'show' })}
            />,
            <UserMenuItem
              key="edit"
              label="Editer mon profil"
              icon={EditIcon}
              to={createPath({ resource: 'Person', id: identity.id, type: 'edit' })}
            />,
            <Logout key="logout" />,
          ]
        : [
            <UserMenuItem key="signup" label="S'inscrire" to="/login?signup=true" />,
            <UserMenuItem key="login" label="Se connecter" to="/login" />,
          ]}
    </RaUserMenu>
  );
};

export default UserMenu;
