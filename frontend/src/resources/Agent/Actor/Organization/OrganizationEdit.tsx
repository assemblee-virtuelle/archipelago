import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../../common/layout';
import OrganizationForm from './OrganizationForm';

const OrganizationEdit = () => (
  <Edit redirect="show">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />}  mode="onBlur" reValidateMode="onBlur">
      <OrganizationForm />
    </SimpleForm>
  </Edit>
);

export default OrganizationEdit;
