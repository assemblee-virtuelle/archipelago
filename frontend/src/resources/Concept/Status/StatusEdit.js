import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import Title from "../../../layout/Title";
import Edit from "../../../layout/edit/Edit";

export const ThemeEdit = props => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </Edit>
);

export default ThemeEdit;
