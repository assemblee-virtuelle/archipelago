import React from 'react';
import { Edit } from '../../../common/layout';
import StatusForm from './StatusForm';

export const StatusEdit = () => (
  <Edit redirect="list">
    <StatusForm edit />
  </Edit>
);

export default StatusEdit;
