import React, { PropsWithChildren, useState } from 'react';
import { Box, Drawer, Fab, Toolbar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import { useLayoutContext } from '../LayoutContext';
import { LayoutOptions } from '.';

const asideWidth = '300px';

const ContentBox = styled(Box)(({ theme }) => ({
  minWidth: asideWidth,
  padding: 16,
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    paddingBottom: 56 + 16,
  },
}));

const Aside = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAsideOpen, setAsideOpen] = useState(false);

  const layout = useLayoutContext<LayoutOptions>();
  const side = layout.options.sideBarPlacement;

  return (
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
        <ContentBox>{children}</ContentBox>
      </Drawer>
    </>
  );
};

export default Aside;
