import React from 'react';
import { FormTab, SelectInput, TabbedForm, TextInput, ImageField } from 'react-admin';
import { ReferenceInput, ImageInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";

export const DocumentEdit = props => (
  <Edit redirect="show" {...props}>
    <TabbedForm syncWithLocation={false}>
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <MarkdownInput source="pair:description" fullWidth />
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:DocumentType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </FormTab>
      <FormTab label="Relations">
        <AgentsInput source="pair:documents" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default DocumentEdit;
