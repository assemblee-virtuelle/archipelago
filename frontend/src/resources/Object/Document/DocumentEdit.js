import React from 'react';
import { FormTab, SelectInput, TabbedForm, TextInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Title from "../../../layout/Title";
import Edit from "../../../layout/edit/Edit";

export const DocumentEdit = props => (
  <Edit title={<Title />} redirect="show" {...props}>
    <TabbedForm>
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput source="pair:description" fullWidth />
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:DocumentType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="Relations">
        <AgentsInput source="pair:documents" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default DocumentEdit;
