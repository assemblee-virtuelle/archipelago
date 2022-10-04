import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import TypeTitle from './TypeTitle';
import Edit from "../../../layout/edit/Edit";

export const ThemeEdit = props => (
  <Edit title={<TypeTitle />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default ThemeEdit;
