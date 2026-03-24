import React from 'react';
import { SimpleForm, useTranslate } from 'react-admin';
import { Create } from '../../../common/layout';
import TypeForm from './TypeForm';

const TypeCreate = () => {
  const translate = useTranslate();

  return (
    <Create title={translate('resources.Type.create')} redirect="show">
      <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
        <TypeForm />
      </SimpleForm>
    </Create>
  );
};

export default TypeCreate;
