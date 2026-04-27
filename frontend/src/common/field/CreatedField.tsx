import React from 'react';
import { Typography } from '@mui/material';
import { DateField, useResourceContext, useTranslate } from 'react-admin';
import RightLabel from '../list/SideList/RightLabel';

const CreatedField = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const t = (field: string, defaultText: string) =>
    translate(`resources.${resource}.show.${field}`, { _: defaultText });

  return (
    <RightLabel label={t('created.title', 'À propos de cette page')} source="dc:created">
      <Typography variant="body2" component="span">
        {t('created.created', 'Créée le :')}{' '}
      </Typography>
      <DateField source="dc:created" showTime />
      <br />
      <Typography variant="body2" component="span">
        {t('created.modified', 'Dernière modification :')}{' '}
      </Typography>
      <DateField source="dc:modified" showTime />
    </RightLabel>
  );
};

export default CreatedField;
