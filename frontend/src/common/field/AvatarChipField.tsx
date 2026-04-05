import React, { PropsWithChildren } from 'react';
import { Link, useCreatePath, useRecordContext, useResourceContext } from 'react-admin';
import { Avatar, Chip, ChipProps } from '@mui/material';

type Props = {
  label: string;
  image: string;
  variant?: ChipProps['variant'];
  color?: ChipProps['color'];
};

const AvatarChipField = ({ label, image, variant = 'outlined', color, ...rest }: PropsWithChildren<Props>) => {
  type IllustratedRecord = {
    [label]: string;
    [image]: string;
  };

  const resource = useResourceContext();
  const record = useRecordContext<IllustratedRecord>();
  const createPath = useCreatePath();

  const computedLabel = record?.[label];
  const computedImage = record?.[image];

  return (
    <Chip
      avatar={<Avatar alt={computedLabel} src={computedImage} {...rest} />}
      label={computedLabel}
      variant={variant}
      color={color}
      component={Link}
      to={createPath({ resource, id: record?.id, type: 'show' })}
      clickable
    />
  );
};

export default AvatarChipField;
