import React from 'react';
import { useRecordContext } from 'react-admin';
import { Avatar, Chip } from '@mui/material';

type Props = {
  label: string;
  image: string;
};

const AvatarChipField = ({ label, image }: Props) => {

  type IllustratedRecord = {
    [label]: string;
    [image]: string;
  };

  const record = useRecordContext<IllustratedRecord>();

  const computedLabel = record?.[label];
  const computedImage = record?.[image];

  return (
    <Chip
      avatar={<Avatar alt={computedLabel} src={computedImage} />}
      label={computedLabel}
      variant="outlined"
    />
  );
};

export default AvatarChipField;
