import React from 'react';
import { FormTab, SelectInput, TabbedForm, TextInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import DocumentTitle from './DocumentTitle';
import Edit from "../../../layout/edit/Edit";

export const DocumentEdit = props => (
  <Edit title={<DocumentTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
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
