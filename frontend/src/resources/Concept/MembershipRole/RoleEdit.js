import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import Edit from "../../../layout/edit/Edit";

export const RoleEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default RoleEdit;
