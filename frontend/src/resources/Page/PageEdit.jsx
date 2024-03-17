import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { MarkdownInput, useLoadLinks } from '@semapps/markdown-components';
import Edit from "../../layout/edit/Edit";

export const PageEdit = props => {
  const loadLinks = useLoadLinks('Page', 'semapps:title');
  return (
    <Edit redirect="show" {...props}>
      <SimpleForm>
        <TextInput source="semapps:title" fullWidth />
        <MarkdownInput source="semapps:content" loadSuggestions={loadLinks} suggestionTriggerCharacters="[" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export default PageEdit;
