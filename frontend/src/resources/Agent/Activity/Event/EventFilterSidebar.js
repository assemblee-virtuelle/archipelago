import React from 'react';
import { Card, CardContent } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReferenceFilter } from '@semapps/list-components';

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: '15em',
      marginLeft: '1em'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  cardContent: {
    paddingTop: 0
  }
}));

const EventFilterSidebar = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <ReferenceFilter
          reference="Theme"
          source="pair:hasTopic"
          inverseSource="pair:topicOf"
          limit={100}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
      </CardContent>
    </Card>
  );
};

export default EventFilterSidebar;
