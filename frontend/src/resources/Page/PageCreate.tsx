import React from 'react';
import { SimpleForm, useTranslate } from 'react-admin';
import { Create } from '../../common/layout';
import PageForm from './PageForm';

const PageCreate = () => {
  const translate = useTranslate();

  return (
    <Create title={translate('resources.Page.create')} redirect="show">
      <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
        <PageForm />
      </SimpleForm>
    </Create>
  );
};

export default PageCreate;
