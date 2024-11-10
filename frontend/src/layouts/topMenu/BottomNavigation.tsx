import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Link as RRLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useLayoutContext } from '../LayoutContext';
import { LayoutOptions } from '.';

const BottomNavigation = () => {
  const layout = useLayoutContext<LayoutOptions>();
  const location = useLocation();

  const [value, setValue] = useState<number>();

  useEffect(() => {
    if (location.pathname === '/') {
      setValue(0);
      return;
    }

    const match = (layout.options.mainMenu || []).findIndex(
      (item) => item.resource && location.pathname.startsWith(`/${item.resource}`),
    );

    setValue(match > -1 ? match + 1 : undefined);
  }, [location, layout]);

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
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} component={RRLink} to="/" />
        {(layout.options.mainMenu || []).map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.mobileLabel || item.label}
            icon={item.icon ? <item.icon /> : undefined}
            component={RRLink}
            to={item.link}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
