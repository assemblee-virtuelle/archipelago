import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import Create from "../../../layout/create/Create";

const RoleCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="pair:label" />
    </SimpleForm>
  </Create>
);

export default RoleCreate;
