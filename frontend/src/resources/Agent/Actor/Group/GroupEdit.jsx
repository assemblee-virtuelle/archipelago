import React from 'react';
import { SimpleForm, TextInput, ImageField } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { UsersInput, EventsInput, DocumentsInput } from '../../../../common/input';
import { Edit } from '../../../../common/layout';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';

export const GroupEdit = props => (
  <Edit redirect="show" {...props}>
    <SimpleForm toolbar={<EditToolbarWithPermissions />}>
      <TextInput source="pair:label" fullWidth />
      <TextInput source="pair:comment" fullWidth />
      <MarkdownInput source="pair:description" fullWidth />
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>
      <UsersInput source="pair:affiliates" />
      <EventsInput source="pair:involvedIn" />
      <DropDownTreeSelect source="pair:hasTopic" reference="Theme" label="A pour thème" />
      <DocumentsInput source="pair:documentedBy" />
    </SimpleForm>
  </Edit>
);

export default GroupEdit;
