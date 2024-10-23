import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Link } from 'react-admin';
import { useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();

  const [value, setValue] = useState<number>();

  useEffect(() => {
    if (location.pathname.startsWith('/Organization')) {
      setValue(1);
    } else if (location.pathname.startsWith('/Event')) {
      setValue(2);
    } else if (location.pathname === '/') {
      setValue(0);
    } else {
      setValue(undefined);
    }
  }, [location]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      elevation={5}
    >
      <MuiBottomNavigation showLabels value={value}>
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Carte" icon={<MapIcon />} component={Link} to="/Organization?perPage=500&sort=pair%3Alabel&view=map&lat=47.2186353776589&lng=-1.5545654296875002&zoom=10" />
        <BottomNavigationAction label="Agenda" icon={<CalendarMonthIcon />} component={Link} to="/Event" />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
