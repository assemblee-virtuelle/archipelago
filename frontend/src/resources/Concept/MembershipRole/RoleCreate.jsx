import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Create } from '../../../layout';

const RoleCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="pair:label" />
    </SimpleForm>
  </Create>
);

export default RoleCreate;
