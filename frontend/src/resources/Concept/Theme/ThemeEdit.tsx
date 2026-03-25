import React from 'react';
import { useGetRecordId } from 'react-admin';
import { Edit } from '../../../common/layout';
import ThemeForm from './ThemeForm';

export const ThemeEdit = () => {
  const recordId = useGetRecordId();

  return (
    <Edit>
      <ThemeForm recordId={`${recordId}`} />
    </Edit>
  );
};

export default ThemeEdit;
