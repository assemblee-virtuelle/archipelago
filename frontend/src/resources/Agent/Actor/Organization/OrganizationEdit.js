import React from 'react';
import {
  TextInput,
  SelectInput,
  TabbedForm,
  ImageField
} from 'react-admin';
import { ReferenceInput, ImageInput, ReferenceArrayInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { MultiLinesInput } from '@semapps/input-components';
import { OrganizationsInput, EventsInput, DocumentsInput, LocationInput } from '../../../../common/input';
import Title from "../../../../layout/Title";
import Edit from "../../../../layout/edit/Edit";
import TreeAutocompleteArrayInput from '../../../../common/input/TreeComponent/TreeAutocompleteArrayInput';

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
      {/* <TabbedForm.Tab label="Membres">
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
      </TabbedForm.Tab> */}
      <TabbedForm.Tab label="Relations">
        <OrganizationsInput source="pair:partnerOf" />
        <EventsInput source="pair:involvedIn" />
        <ReferenceArrayInput label="Thèmes" reference="Theme" source="pair:hasTopic" >
          <TreeAutocompleteArrayInput
            optionText="pair:label"
            parentProperty="pair:broader"
            treeReference="Theme"
            source="pair:hasTopic"
            // shouldRenderSuggestions={value => false} 
            defaultExpanded={true}
            fullWidth
          />
        </ReferenceArrayInput>        
        <DocumentsInput source="pair:documentedBy" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default OrganizationEdit;
