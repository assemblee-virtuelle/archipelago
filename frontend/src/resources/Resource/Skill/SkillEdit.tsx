import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../common/layout';
import SkillForm from './SkillForm';

const SkillEdit = () => (
  <Edit redirect="show">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <SkillForm />
    </SimpleForm>
  </Edit>
);

export default SkillEdit;
