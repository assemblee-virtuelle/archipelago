import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../common/layout';
import StatusForm from './StatusForm';

export const StatusEdit = () => (
  <Edit redirect="list">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <StatusForm edit />
    </SimpleForm>
  </Edit>
);

export default StatusEdit;
