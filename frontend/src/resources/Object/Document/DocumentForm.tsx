import React from 'react';
import { SelectInput, TextInput, ImageField, ReferenceInput, useTranslate, required } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { AgentsInput } from '../../../common/input';
import MarkdownInput from '../../../common/input/MarkdownInput';

export const DocumentForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Document.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />
      <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:DocumentType' }}>
        <SelectInput optionText="pair:label" helperText={translateHelper('pair:hasType')} />
      </ReferenceInput>
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>
      <AgentsInput source="pair:documents" helperText={translateHelper('pair:documents')} />
    </>
  );
};

export default DocumentForm;
