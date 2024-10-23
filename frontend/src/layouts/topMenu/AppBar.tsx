import React from 'react';
import { AppBar as MuiAppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-admin';
import UserMenu from './UserMenu';
import ResourcesMenu from './ResourcesMenu';
import { useLayoutContext } from '../LayoutContext';
import { LayoutOptions } from '.';

const AppTitle = styled(Typography)(({ theme }) => ({
  textWrap: 'balance',
  lineHeight: '1.1',
  [theme.breakpoints.down('lg')]: {
    fontSize: '1rem',
    maxWidth: '120px',
    textAlign: 'center',
  },
  '& span': {
    color: theme.palette.secondary.main,
    fontSize: '1rem',
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.8rem',
    },
  },
})) as typeof Typography;

const AppBar = () => {
  const layout = useLayoutContext<LayoutOptions>();

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ marginRight: { xs: 0, lg: 1 } }}>
          <Link to="/" color="inherit" underline="none">
            <Box
              height={'48px'}
              component={'img'}
              src={'/logo192.png'}
              alt="Logo"
              sx={{ paddingTop: '5px', boxSizing: 'content-box' }}
            />
          </Link>
        </Box>

        {layout.options.title?.() || <div>Default title</div>}

        <Box sx={{ flexGrow: 1 }}>
          <AppTitle component="h1" variant="h6">
            <Link to="/" color="inherit" underline="none">
              Transiscope <span>en Pays Nantais</span>
            </Link>
          </AppTitle>
        </Box>

        <Stack sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} spacing={2} direction="row">
          <Button
            color="inherit"
            size="large"
            startIcon={<MapIcon />}
            component={Link}
            to={
              '/Organization?perPage=500&sort=pair%3Alabel&view=map&lat=47.2186353776589&lng=-1.5545654296875002&zoom=10'
            }
          >
            Carte des alternatives
          </Button>
          <Button color="inherit" size="large" startIcon={<CalendarMonthIcon />} component={Link} to={'/Event'}>
            Agenda
          </Button>
        </Stack>

        <ResourcesMenu />

        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
