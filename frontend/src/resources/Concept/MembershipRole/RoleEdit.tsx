import React from 'react';
import { Edit } from '../../../common/layout';
import RoleForm from './RoleForm';

export const RoleEdit = () => (
  <Edit redirect="list">
    <RoleForm />
  </Edit>
);

export default RoleEdit;
