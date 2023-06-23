import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import Edit from "../../../layout/edit/Edit";
import Title from "../../../layout/Title";

export const RoleEdit = props => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default RoleEdit;
