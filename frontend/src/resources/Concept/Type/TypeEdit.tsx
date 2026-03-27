import React from 'react';
import { Edit } from '../../../common/layout';
import TypeForm from './TypeForm';

export const ThemeEdit = () => (
  <Edit redirect="list">
    <TypeForm edit />
  </Edit>
);

export default ThemeEdit;
