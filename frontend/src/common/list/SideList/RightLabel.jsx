import React from 'react';
import { useTranslate, getFieldLabelTranslationArgs, useShowContext } from 'react-admin';
import { Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  rightLabel: {
    color: 'grey',
    textAlign: 'right',
    borderBottom: '1px dashed #c0c0c0',
    paddingBottom: 10,
    marginBottom: 10
  }
}));

const RightLabel = ({ label, children, source, mb = 4 }) => {
  const classes = useStyles();
  const { record, resource } = useShowContext();
  const translate = useTranslate();
  if (!record?.[source]) return null;
  return (
    <Box mb={mb}>
      <Box className={classes.rightLabel}>
        {translate(
          ...getFieldLabelTranslationArgs({
            label,
            resource,
            source
          })
        )}
      </Box>
      {children && (
        <Box m={0}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default RightLabel;
