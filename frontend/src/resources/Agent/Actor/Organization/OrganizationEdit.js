import React from 'react';
import {
  TextInput,
  SelectInput,
  TabbedForm,
  ImageField,
  AutocompleteInput,
  SimpleFormIterator,
} from 'react-admin';
import { ReferenceInput, ImageInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { OrganizationsInput, EventsInput, DocumentsInput, LocationInput } from '../../../../common/input';
import Edit from "../../../../layout/edit/Edit";
import CustomTreeSelectArrayInput from '../../../../common/input/TreeComponent/CustomTreeSelectArrayInput';
import ReificationArrayInput from '../../../../common/input/ReificationArrayInput';
import JsonLDArrayInput from '../../../../common/input/JsonLDArrayInput';

export const OrganizationEdit = props => (
  <Edit redirect="show" {...props}>
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
        <JsonLDArrayInput source="pair:homePage" fullWidth>
          <SimpleFormIterator disableReordering disableClear fullWidth>
            <TextInput fullWidth type="url" />
          </SimpleFormIterator>
        </JsonLDArrayInput>
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
        <DocumentsInput source="pair:documentedBy" />
        <CustomTreeSelectArrayInput source="pair:hasTopic" reference="Theme" label="A pour thème" broader="pair:broader" fullWidth />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
