import React from 'react';
import { Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  subTitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    '&:first-of-type': {
      marginTop: theme.spacing(1),
    }
  },
  subTitleSpan: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75, 2)
  }
}));

const LargeLabel = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.subTitle}>
      <span className={classes.subTitleSpan}>{children}</span>
    </Typography>
  );
};

export default LargeLabel;
