import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  title: {
    paddingTop: 20,
    paddingBottom: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
      paddingTop: 0,
      paddingBottom: 6
    }
  },
  actions: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiToolbar-root': {
        backgroundColor: theme.palette.background.default,
        minHeight: 0,
        paddingTop: 0
      },
      '& .MuiButtonBase-root': {
        padding: 0
      },
      order: -1
    }
  },
  card: {
    marginTop: 0,
    transition: theme.transitions.create('margin-top'),
    position: 'relative',
    flex: '1 1 auto',
    [theme.breakpoints.down('sm')]: {
      '& > .MuiBox-root, .MuiCardContent-root': {
        paddingRight: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5)
      }
    },
  }
}));

const BaseView = ({ title, actions, aside, context, children }) => {
  const classes = useStyles();
  return(
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4" color="primary" component="h1" className={classes.title}>
          {title ?? context.defaultTitle}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.actions}>
        {actions}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex' }}>
          <Card className={classes.card}>
            {children}
          </Card>
          {aside}
        </Box>
      </Grid>
    </Grid>
  )
};

export default BaseView;
