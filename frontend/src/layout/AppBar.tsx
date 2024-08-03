import React from 'react';
import { AppBar as RaAppBar, Link, AppBarProps, Logout } from 'react-admin';
import { Zoom, Box, Typography } from '@mui/material';
import { UserMenu } from '@semapps/auth-provider';
import SearchForm from './SearchForm';

const AppBar = (props: AppBarProps) => {
  return (
    <RaAppBar {...props} userMenu={<UserMenu profileResource="Person" logout={<Logout />} />} color="primary">
      <Link to="/" sx={{ flex: { xs: 1, sm: 0 } }}>
        <Box
          sx={{
            flex: { xs: 1, sm: 'unset' },
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: 48,
              marginLeft: '0.2em',
              marginRight: '0.2em',
            }}
          >
            <Zoom in={true} timeout={2000}>
              <img height="100%" src={'/logo192.png'} alt="logo" />
            </Zoom>
          </Box>
          <Typography
            sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}
            color="primary.contrastText"
            variant="h6"
            noWrap
          >
            {props.title}
          </Typography>
        </Box>
      </Link>
      <Box
        sx={{
          display: { xs: 'none', sm: 'revert' },
          width: '100%',
          minWidth: { xs: 240, md: 360 },
          flex: 2,
          margin: '0 5%',
          marginRight: { xs: '5%', md: '100px' },
        }}
      >
        <Box sx={{ margin: 'auto', maxWidth: 880 }}>
          <SearchForm />
        </Box>
      </Box>
    </RaAppBar>
  );
};

export default AppBar;
