import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../layout';

export const RoleEdit = props => (
  <Edit {...props}>
    <SimpleForm toolbar={<EditToolbarWithPermissions />}>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default RoleEdit;
