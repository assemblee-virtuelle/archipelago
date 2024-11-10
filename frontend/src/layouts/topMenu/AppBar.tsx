import React from 'react';
import { AppBar as MuiAppBar, Box, Button, Stack, Toolbar, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RRLink } from 'react-router-dom';
import config from '../../config/config';
import UserMenu from './UserMenu';
import ResourcesMenu from './ResourcesMenu';
import { useLayoutContext } from '../LayoutContext';
import { LayoutOptions } from '.';

const AppTitle = styled(Typography)(({ theme }) => ({
  textWrap: 'balance',
  lineHeight: '1.1',
  [theme.breakpoints.down('lg')]: {
    fontSize: '1rem',
    textAlign: 'center',
  },
})) as typeof Typography;

const AppBar = () => {
  const layout = useLayoutContext<LayoutOptions>();
  const logo = layout.options.logo;

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {logo && (
          <Box sx={{ marginRight: { xs: 0, lg: 1 } }}>
            <Link component={RRLink} to="/" color="inherit" underline="none">
              <Box
                height={'48px'}
                component={'img'}
                src={typeof logo === 'string' ? logo : logo.url}
                alt={typeof logo === 'string' ? 'Logo' : logo.alt}
                sx={{ paddingTop: '5px', boxSizing: 'content-box' }}
              />
            </Link>
          </Box>
        )}

        {!(layout.options.title === false) && (
          <>
            {(typeof layout.options.title === 'function' && layout.options.title?.()) || (
              <AppTitle component="h1" variant="h6">
                <Link component={RRLink} to="/" color="inherit" underline="none">
                  {config.title}
                </Link>
              </AppTitle>
            )}
          </>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack sx={{ display: { xs: 'none', md: 'block' } }} spacing={2} direction="row">
          {(layout.options.mainMenu || []).map((item) => (
            <Button
              key={item.label}
              color="inherit"
              size="large"
              startIcon={item.icon ? <item.icon /> : undefined}
              component={RRLink}
              to={item.link}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <ResourcesMenu />

        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
