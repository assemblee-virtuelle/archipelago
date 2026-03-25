import React from 'react';
import { required, TextInput, useTranslate } from 'react-admin';

const RoleForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.MembershipRole.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
    </>
  );
};

export default RoleForm;
