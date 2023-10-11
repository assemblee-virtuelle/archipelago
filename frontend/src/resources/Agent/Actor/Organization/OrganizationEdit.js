import React from 'react';
import {
  TextInput,
  SelectInput,
  TabbedForm,
  ImageField,
  AutocompleteInput,
} from 'react-admin';
import { ReferenceInput, ImageInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { MultiLinesInput } from '@semapps/input-components';
import { OrganizationsInput, EventsInput, ThemesInput, DocumentsInput, LocationInput } from '../../../../common/input';
import Title from "../../../../layout/Title";
import Edit from "../../../../layout/edit/Edit";
import ReificationArrayInput from '../../../../common/input/ReificationArrayInput';

export const OrganizationEdit = props => (
  <Edit title={<Title />} redirect="show" {...props}>
    <TabbedForm>
      <TabbedForm.Tab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <MarkdownInput source="pair:description" fullWidth />
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:AgentStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:OrganizationType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <MultiLinesInput source="pair:homePage" fullWidth />
        <TextInput source="pair:e-mail" fullWidth type="email" />
        <LocationInput source="pair:hasLocation" fullWidth />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Membres">
        <ReificationArrayInput source="pair:organizationOfMembership" reificationClass="pair:MembershipAssociation"  >
          <ReferenceInput reference="Person" source="pair:membershipActor">
          <AutocompleteInput label="Membre" optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
            size='small'
            sx={{
              mt: 1,
              mb: '4px',
              minWidth: 300,
            }}
            shouldRenderSuggestions={value => value && value.length > 1}
          />
          </ReferenceInput>
          <ReferenceInput reference="MembershipRole" source="pair:membershipRole">
            <SelectInput label="Rôle" optionText="pair:label" />
          </ReferenceInput>
        </ReificationArrayInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Relations">
        <OrganizationsInput source="pair:partnerOf" />
        <EventsInput source="pair:involvedIn" />
        <ThemesInput source="pair:hasTopic" />
        <DocumentsInput source="pair:documentedBy" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
