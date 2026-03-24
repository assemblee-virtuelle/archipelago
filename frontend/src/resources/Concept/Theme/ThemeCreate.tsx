import React from 'react';
import { SimpleForm, useTranslate } from 'react-admin';
import { Create } from '../../../common/layout';
import ThemeForm from './ThemeForm';

const ThemeCreate = () => {
  const translate = useTranslate();

  return (
    <Create title={translate('resources.Theme.create')} redirect="show">
      <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
        <ThemeForm />
      </SimpleForm>
    </Create>
  );
};

export default ThemeCreate;
