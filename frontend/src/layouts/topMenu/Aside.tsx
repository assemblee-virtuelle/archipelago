import React, { PropsWithChildren, useState } from 'react';
import { Box, Drawer, Fab, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import { useLayoutContext } from '../LayoutContext';
import { LayoutOptions } from '.';

const asideWidth = '300px';

const ContentBox = styled(Box)(({ theme }) => ({
  minWidth: asideWidth,
  padding: 16,
  boxSizing: 'border-box',
  position: 'sticky',
  height: 'calc(100vh - 64px)',
  top: '64px',
  overflow: 'auto',
  [theme.breakpoints.down('md')]: {
    paddingBottom: 56 + 16,
    height: 'calc(100vh - 56px)',
    top: '56px',
  },
}));

const FloatingBox = styled(Box)(() => ({
  position: 'absolute',
  height: '100%',
  '& .MuiFab-root': {
    left: 10,
    position: 'sticky',
    top: 'calc(100% - 56px - 56px)'
  }
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
        <FloatingBox>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setAsideOpen(true)}
          >
            <TuneIcon sx={{ mr: 1 }} />
            Filtres
          </Fab>
        </FloatingBox>
      )}
      <Drawer
        sx={{
          width: asideWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: asideWidth,
            boxSizing: 'border-box',
            position: {xs: 'fixed', md: 'absolute'},
            overflow: 'unset',
            left: (!side || side === 'left') ? 0 : 'auto',
            right: (!side || side === 'left') ? 'auto' : 0,
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isAsideOpen}
        anchor={side}
        onClose={() => setAsideOpen(false)}
      >
        <ContentBox>{children}</ContentBox>
      </Drawer>
    </>
  );
};

export default Aside;
