import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import StatusTitle from './StatusTitle';
import Edit from "../../../layout/edit/Edit";

export const ThemeEdit = props => (
  <Edit title={<StatusTitle />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default ThemeEdit;
