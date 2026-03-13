import React from 'react';
import { ImageField, SelectInput, TextInput, TabbedForm, FormTab, ReferenceInput } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ActorsInput, DocumentsInput, ResourcesInput } from '../../../../common/input';
import { ImageInput } from '@semapps/input-components';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { Edit } from '../../../../common/layout';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';

const ProjectEdit = props => (
  <Edit redirect="show" {...props}>
    <TabbedForm syncWithLocation={false} toolbar={<EditToolbarWithPermissions />}>
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
        <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
          <ImageField source="src" />
        </ImageInput>
      </FormTab>
      <FormTab label="Relations">
        <ActorsInput source="pair:involves" />
        <ResourcesInput source="pair:needs" />
        <DocumentsInput source="pair:documentedBy" />
        <DropDownTreeSelect source="pair:hasTopic" reference="Theme" labelKey="pair:label" parentKey="pair:broader" label="A pour thème" multiple />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default ProjectEdit;
