import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../../common/layout';
import GroupForm from './GroupForm';

export const GroupEdit = () => (
  <Edit redirect="show">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />}  mode="onBlur" reValidateMode="onBlur">
      <GroupForm />
    </SimpleForm>
  </Edit>
);

export default GroupEdit;
