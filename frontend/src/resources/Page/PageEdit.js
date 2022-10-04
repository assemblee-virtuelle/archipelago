import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { MarkdownInput, useLoadLinks } from '@semapps/markdown-components';
import PageTitle from './PageTitle';
import Edit from "../../layout/edit/Edit";

export const PageEdit = props => {
  const loadLinks = useLoadLinks('Page', 'semapps:title');
  return (
    <Edit title={<PageTitle />} {...props}>
      <SimpleForm redirect="show">
        <TextInput source="semapps:title" fullWidth />
        <MarkdownInput source="semapps:content" loadSuggestions={loadLinks} suggestionTriggerCharacters="[" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export default PageEdit;
