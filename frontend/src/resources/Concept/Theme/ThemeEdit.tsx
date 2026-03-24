import React from 'react';
import { SimpleForm, useGetRecordId } from 'react-admin';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../common/layout';
import ThemeForm from './ThemeForm';

export const ThemeEdit = () => {
  const recordId = useGetRecordId();

  return (
    <Edit redirect="show">
      <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />} mode="onBlur" reValidateMode="onBlur">
        <ThemeForm recordId={`${recordId}`} />
      </SimpleForm>
    </Edit>
  );
};

export default ThemeEdit;
