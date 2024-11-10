import React from 'react';
import { ShowButton, EditButton, useResourceDefinition, useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { useLayoutContext } from '../../layouts/LayoutContext';

const MobileMapPopupContent = () => {
  const record = useRecordContext();
  const resourceDefinition = useResourceDefinition({});
  const layout = useLayoutContext();

  if (!record) return null;

  return (
    <Box sx={{ paddingBottom: layout.name === 'topMenu' ? '56px' : 0 }}>
      {record.label && <Typography variant="h5">{record.label}</Typography>}
      {record.description && (
        <Typography>
          {record.description.length > 150 ? `${record.description.substring(0, 150)}...` : record.description}
        </Typography>
      )}
      {resourceDefinition.hasShow && <ShowButton />}
      {resourceDefinition.hasEdit && <EditButton />}
    </Box>
  );
};

export default MobileMapPopupContent;
