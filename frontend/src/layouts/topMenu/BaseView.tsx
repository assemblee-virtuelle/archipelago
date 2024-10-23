import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Grid, Typography, Box, Drawer, Toolbar, useMediaQuery, Fab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import { LayoutOptions } from './index';
import { useLayoutContext } from '../LayoutContext';

const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
})) as typeof Typography;

const ActionsGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiToolbar-root': {
      backgroundColor: theme.palette.background.default,
      minHeight: 0,
      paddingTop: 0,
      alignItems: 'center',
      height: '100%',
    },
    '& .MuiButtonBase-root': {
      padding: 0,
    },
  },
}));

type Props = {
  title: string | ReactNode;
  actions: JSX.Element;
  aside?: JSX.Element;
};

const BaseView = ({ title, actions, aside, children }: PropsWithChildren<Props>) => {
  const layout = useLayoutContext<LayoutOptions>();

  const side = layout.options.sideBarPlacement;
  const asideWidth = '300px';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAsideOpen, setAsideOpen] = useState(false);

  return (
    <>
      <Box sx={{ [side === 'left' ? 'marginLeft' : 'marginRight']: aside && !isMobile ? asideWidth : 0 }}>
        <Grid container sx={{ paddingTop: 2 }}>
          <Grid item xs={9} sm={8}>
            <Title variant="h4" color="primary" component="h1">
              {title}
            </Title>
          </Grid>
          <ActionsGrid item xs={3} sm={4}>
            {actions}
          </ActionsGrid>
          <Grid item xs={12} sx={{ display: 'flex', marginTop: 1 }}>
            <Box sx={{ flex: 1 }}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
      {aside && (
        <>
          {isMobile && (
            <Fab
              variant="extended"
              color="primary"
              sx={{
                position: 'fixed',
                bottom: 64,
                left: 10,
              }}
              onClick={() => setAsideOpen(true)}
            >
              <TuneIcon sx={{ mr: 1 }} />
              Filtres
            </Fab>
          )}
          <Drawer
            sx={{
              width: asideWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: asideWidth,
                boxSizing: 'border-box',
              },
            }}
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isAsideOpen}
            anchor={side}
            onClose={() => setAsideOpen(false)}
          >
            <Toolbar />
            {aside}
          </Drawer>
        </>
      )}
    </>
  );
};

export default BaseView;
