import React from 'react';
import { useRecordContext } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed'
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display:'tableCell'
  },
  
}));

const Title = ({fieldName}) => {
  const record = useRecordContext();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>{record ? record[fieldName] : ''}</div>
    </div>
  );
};

Title.defaultProps = {
  fieldName: 'pair:label'
};

export default Title;
