import React from 'react';
import { SimpleForm, TextInput, ImageField } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { UsersInput, EventsInput, ThemesInput, DocumentsInput } from '../../../../common/input';
import Edit from "../../../../layout/edit/Edit";

export const GroupEdit = props => (
  <Edit redirect="show" {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
      <TextInput source="pair:comment" fullWidth />
      <MarkdownInput source="pair:description" fullWidth />
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <UsersInput source="pair:affiliates" />
      <EventsInput source="pair:involvedIn" />
      <ThemesInput source="pair:hasTopic" />
      <DocumentsInput source="pair:documentedBy" />
    </SimpleForm>
  </Edit>
);

export default GroupEdit;
