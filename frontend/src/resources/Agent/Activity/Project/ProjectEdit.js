import React from 'react';
import { ImageField, SelectInput, TextInput, TabbedForm, FormTab } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ActorsInput, DocumentsInput, ThemesInput, ResourcesInput } from '../../../../common/input';
import ProjectTitle from './ProjectTitle';
import { ImageInput } from '@semapps/input-components';
import { ReferenceInput } from '@semapps/input-components';
import Edit from "../../../../layout/edit/Edit";

const ProjectEdit = props => (
  <Edit title={<ProjectTitle />} redirect="show" {...props}>
    <TabbedForm>
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <MarkdownInput source="pair:description" fullWidth />
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:ProjectStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:ProjectType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <TextInput source="pair:homePage" fullWidth />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </FormTab>
      <FormTab label="Relations">
        <ActorsInput source="pair:involves" />
        <ResourcesInput source="pair:needs" />
        <DocumentsInput source="pair:documentedBy" />
        <ThemesInput source="pair:hasTopic" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ProjectEdit;
