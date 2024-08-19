import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { MarkdownInput, useLoadLinks } from '@semapps/markdown-components';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../layout';

export const PageEdit = props => {
  const loadLinks = useLoadLinks('Page', 'semapps:title');
  return (
    <Edit redirect="show" {...props}>
      <SimpleForm toolbar={<EditToolbarWithPermissions />}>
        <TextInput source="semapps:title" fullWidth />
        <MarkdownInput source="semapps:content" loadSuggestions={loadLinks} suggestionTriggerCharacters="[" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export default PageEdit;
