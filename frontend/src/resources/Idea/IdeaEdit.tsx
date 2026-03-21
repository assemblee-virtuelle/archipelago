import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../common/layout';
import IdeaForm from './IdeaForm';

const IdeaEdit = () => (
  <Edit redirect="show">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <IdeaForm />
    </SimpleForm>
  </Edit>
);

export default IdeaEdit;
