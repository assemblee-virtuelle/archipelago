import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../common/layout';
import TypeForm from './TypeForm';

export const ThemeEdit = () => (
  <Edit redirect="list">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <TypeForm edit />
    </SimpleForm>
  </Edit>
);

export default ThemeEdit;
