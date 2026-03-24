import React from 'react';
import { SimpleForm } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../common/layout';
import PageForm from './PageForm';

const PageEdit = () => {
  return (
    <Edit redirect="show">
      <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
        <PageForm />
      </SimpleForm>
    </Edit>
  );
};

export default PageEdit;
