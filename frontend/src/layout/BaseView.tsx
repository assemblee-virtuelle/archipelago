import React, { PropsWithChildren, ReactNode } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  return (
    <Grid container sx={{ marginTop: { xs: 0, sm: 2 } }}>
      <Grid item xs={9} sm={8}>
        <Title variant="h4" color="primary" component="h1">
          {title}
        </Title>
      </Grid>
      <ActionsGrid item xs={3} sm={4}>
        {actions}
      </ActionsGrid>
      <Grid item xs={12} sx={{ display: 'flex', marginTop: 1 }}>
        <Card sx={{ flex: 1 }}>{children}</Card>
        {aside}
      </Grid>
    </Grid>
  );
};

export default BaseView;
