import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import Create from "../../layout/create/Create";

const PageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="semapps:title" fullWidth />
    </SimpleForm>
  </Create>
);

export default PageCreate;
