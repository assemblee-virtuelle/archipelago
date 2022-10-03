import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingTop: 20,
    paddingBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.8rem'
    }
  }
}));

const BaseView = ({ title, actions, context, children }) => {
  const classes = useStyles();
  return(
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4" color="primary" component="h1" className={classes.title}>
          {React.cloneElement(title, context)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {React.cloneElement(actions, context)}
      </Grid>
      <Grid item xs={12}>
        <Paper>
          {children}
        </Paper>
      </Grid>
    </Grid>
  )
};

export default BaseView;
