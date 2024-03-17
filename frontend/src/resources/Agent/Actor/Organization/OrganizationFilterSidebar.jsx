import React from 'react';
import { Card, CardContent } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReferenceFilter } from '@semapps/list-components';
import ReferenceFilterTree from '../../../../common/ReferenceFilterTree';

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

const ProjectFilterSidebar = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <ReferenceFilter
          reference="Type"
          source="pair:hasType"
          inverseSource="pair:typeOf"
          limit={100}
          filter={{ a: 'pair:OrganizationType' }}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
        <ReferenceFilterTree
          reference="Theme"
          title="Thèmes"
          broader="pair:broader"
          source="pair:hasTopic"
          label="pair:label"
          predicate="http://virtual-assembly.org/ontologies/pair#hasTopic"
          limit={100}
          sort={{ field: 'pair:label', order: 'DESC' }}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectFilterSidebar;
