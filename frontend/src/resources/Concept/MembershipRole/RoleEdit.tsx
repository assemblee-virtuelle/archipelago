import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../common/layout';
import RoleForm from './RoleForm';

export const RoleEdit = () => (
  <Edit redirect="list">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <RoleForm />
    </SimpleForm>
  </Edit>
);

export default RoleEdit;
