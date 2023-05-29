import React from 'react';
import { useShowContext } from "react-admin";
import { Box, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  loader: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    paddingTop: 100,
    paddingBottom: 100
  },
  image: {
    width: '100%',
    maxHeight: 'none',
    margin: '0.5rem',
    [theme.breakpoints.down('md')]: {
      margin: 0
    },
    '@media print': {
      maxWidth: 250,
      height: 'auto'
    }
  }
}));

const MainImage = ({ source, defaultImage, ...rest }) => {
  const classes = useStyles();
  const { isLoading, record } = useShowContext();

  if (isLoading) return null;

  if (!record[source]) {
    record[source] = defaultImage;
  }

  const image = Array.isArray(record[source]) ? record[source][0] : record[source];

  if (image.rawFile instanceof File) {
    return (
      <Box align="center" className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  } else {
    return <img src={image} className={classes.image} alt={record['pair:label']} {...rest} />;
  }
};

export default MainImage;
