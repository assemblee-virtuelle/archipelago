import React from 'react';
import {
  TextInput,
  ImageInput,
  AutocompleteInput,
  SelectInput,
  TabbedForm,
  FormTab
} from 'react-admin';
import { ReificationArrayInput } from '@semapps/semantic-data-provider';
import { ImageField } from '@semapps/field-components';
import { ReferenceInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { MultiLinesInput } from '@semapps/input-components';
import { OrganizationsInput, EventsInput, ThemesInput, DocumentsInput, LocationInput } from '../../../../common/input';
import OrganizationTitle from './OrganizationTitle';
import Edit from "../../../../layout/edit/Edit";

export const OrganizationEdit = props => (
  <Edit title={<OrganizationTitle />} redirect="show" {...props}>
    <TabbedForm>
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
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
      </FormTab>
      <FormTab label="Membres">
        <ReificationArrayInput source="pair:organizationOfMembership" reificationClass="pair:MembershipAssociation">
          <ReferenceInput reference="Person" source="pair:membershipActor">
          <AutocompleteInput optionText={record => record && `${record['pair:firstName']} ${record['pair:lastName']}`}
          shouldRenderSuggestions={value => value && value.length > 1}
          />
          </ReferenceInput>
          <ReferenceInput reference="MembershipRole" source="pair:membershipRole">
            <SelectInput optionText="pair:label" />
          </ReferenceInput>
        </ReificationArrayInput>
      </FormTab>
      <FormTab label="Relations">
        <OrganizationsInput source="pair:partnerOf" />
        <EventsInput source="pair:involvedIn" />
        <ThemesInput source="pair:hasTopic" />
        <DocumentsInput source="pair:documentedBy" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
