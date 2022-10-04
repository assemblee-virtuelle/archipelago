import React from 'react';
import { SimpleForm, TextInput, SelectInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ReferenceInput } from '@semapps/input-components';
import { ActorsInput, ActivitiesInput } from '../../common/input';
import IdeaTitle from './IdeaTitle';
import Edit from "../../layout/edit/Edit";

const IdeaEdit = props => (
  <Edit title={<IdeaTitle />} {...props}>
    <SimpleForm redirect="show">
      <TextInput source="pair:label" fullWidth />
      <TextInput source="pair:comment" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:IdeaStatus' }}>
        <SelectInput optionText="pair:label" />
      </ReferenceInput>
      <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:IdeaType' }}>
        <SelectInput optionText="pair:label" />
      </ReferenceInput>
      <ActorsInput source="pair:brainstormedBy" />
      <ActivitiesInput source="pair:concretizedBy" />
    </SimpleForm>
  </Edit>
);

export default IdeaEdit;
