import React from 'react';
import { useShowContext } from 'react-admin';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DetailsList from './DetailsList';
import MainImage from './MainImage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(-1)
  }
}));

const Hero = ({ children, image, defaultImage }) => {
  const classes = useStyles();
  const { isLoading } = useShowContext();
  if (isLoading) return null;

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <MainImage source={image} defaultImage={defaultImage} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <DetailsList>
            {children}
          </DetailsList>
        </Grid>
      </Grid>
    </div>
  );
};

Hero.defaultProps = {
  defaultImage: process.env.PUBLIC_URL + '/logo512.png'
};

export default Hero;
