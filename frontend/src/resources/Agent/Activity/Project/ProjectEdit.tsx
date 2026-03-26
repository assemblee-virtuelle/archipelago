import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../../common/layout';
import ProjectForm from './ProjectForm';

const ProjectEdit = () => (
  <Edit redirect="show">
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
      <ProjectForm />
    </SimpleForm>
  </Edit>
);

export default ProjectEdit;
