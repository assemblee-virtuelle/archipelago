import React, { PropsWithChildren } from 'react';
import { Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const AsideCard = styled(Card)(({ theme }) => ({
  paddingTop: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: '15em',
    marginLeft: '1em'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const Aside = ({ children }: PropsWithChildren) => {
  return (
    <AsideCard>
      <CardContent sx={{ paddingTop: 0 }}>
        {children}
      </CardContent>
    </AsideCard>
  );
};

export default Aside;
