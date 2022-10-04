import React from 'react';
import { SimpleForm, TextInput, ImageInput } from 'react-admin';
import { ImageField } from '@semapps/field-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { UsersInput, EventsInput, ThemesInput, DocumentsInput } from '../../../../common/input';
import GroupTitle from './GroupTitle';
import Edit from "../../../../layout/edit/Edit";

export const GroupEdit = props => (
  <Edit title={<GroupTitle />} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" fullWidth />
      <TextInput source="pair:comment" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
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
