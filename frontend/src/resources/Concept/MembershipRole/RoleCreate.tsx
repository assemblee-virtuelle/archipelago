import React from 'react';
import { SimpleForm, useTranslate } from 'react-admin';
import { Create } from '../../../common/layout';
import RoleForm from './RoleForm';

const RoleCreate = () => {
  const translate = useTranslate();

  return (
    <Create title={translate('resources.MembershipRole.create')} redirect="show">
      <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
        <RoleForm />
      </SimpleForm>
    </Create>
  );
};

export default RoleCreate;
