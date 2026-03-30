import React, { PropsWithChildren } from 'react';
import { useShowContext } from 'react-admin';
import { Box, Grid } from '@mui/material';
import DetailsList from './DetailsList';
import { BaseRecord } from '../../../resources';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(-1),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(2),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 'none',
  margin: '0.5rem',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
  '@media print': {
    maxWidth: 250,
    height: 'auto',
  },
}));

type Props = {
  image: string;
};

const Hero = ({ children, image }: PropsWithChildren<Props>) => {
  type IllustratedRecord = BaseRecord & {
    'pair:label': string;
    [image]: string | string[];
  };

  const { isPending, isLoading, record } = useShowContext<IllustratedRecord>();

  if (isPending || isLoading || !record) {
    return null;
  }

  const imageSrc = Array.isArray(record[image]) ? record[image][0] : record[image];

  return (
    <Root>
      <Grid container spacing={7}>
        {imageSrc && (
          <Grid item xs={12} sm={4}>
            <HeroImage src={imageSrc} alt={record['pair:label']} />
          </Grid>
        )}
        <Grid item xs={12} sm={imageSrc ? 8 : 12}>
          <DetailsList>{children}</DetailsList>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Hero;
