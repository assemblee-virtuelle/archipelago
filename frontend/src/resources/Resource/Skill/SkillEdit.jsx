import React from 'react';
import { FormTab, TextInput, TabbedForm } from 'react-admin';
import Edit from "../../../layout/edit/Edit";
import { UsersInput, AgentsInput } from '../../../common/input';

export const SkillEdit = props => (
  <Edit redirect="show" {...props}>
    <TabbedForm syncWithLocation={false}>
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
      </FormTab>
      <FormTab label="Relations">
        <UsersInput source="pair:offeredBy" />
        <AgentsInput source="pair:neededBy" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default SkillEdit;
