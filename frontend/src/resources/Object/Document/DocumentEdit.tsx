import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../common/layout';
import DocumentForm from './DocumentForm';

export const DocumentEdit = () => (
  <Edit redirect="show">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <DocumentForm />
    </SimpleForm>
  </Edit>
);

export default DocumentEdit;
