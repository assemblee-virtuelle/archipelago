import React from 'react';
import { SimpleForm, useTranslate } from 'react-admin';
import { Create } from '../../../common/layout';
import StatusForm from './StatusForm';

const StatusCreate = () => {
  const translate = useTranslate();

  return (
    <Create title={translate('resources.Status.create')} redirect="show">
      <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
        <StatusForm />
      </SimpleForm>
    </Create>
  );
};

export default StatusCreate;
