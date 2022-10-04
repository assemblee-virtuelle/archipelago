import React from 'react';
import { Grid, makeStyles, Card, Typography, Box } from '@material-ui/core';

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
  },
  card: {
    marginTop: 0,
    transition: theme.transitions.create('margin-top'),
    position: 'relative',
    flex: '1 1 auto',
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
    },
    overflow: 'inherit',
  }
}));

const BaseView = ({ title, actions, aside, context, children }) => {
  const classes = useStyles();
  return(
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4" color="primary" component="h1" className={classes.title}>
          {title ? React.cloneElement(title, context) : context.defaultTitle}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {actions && React.cloneElement(actions, context)}
      </Grid>
      <Grid item xs={12}>
        <Box display="flex">
          <Card className={classes.card}>
            {children}
          </Card>
          {aside && React.cloneElement(aside, context)}
        </Box>
      </Grid>
    </Grid>
  )
};

export default BaseView;
