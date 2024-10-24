import React from 'react';
import {
  TextInput,
  SelectInput,
  TabbedForm,
  ImageField,
  SimpleFormIterator,
  ArrayInput,
  ReferenceInput
} from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { MarkdownInput } from '@semapps/markdown-components';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { OrganizationsInput, EventsInput, DocumentsInput, LocationInput } from '../../../../common/input';
import { Edit } from '../../../../common/layout';
import CustomTreeSelectArrayInput from '../../../../common/input/TreeComponent/CustomTreeSelectArrayInput';
import MembershipAssociationInput from '../../../../common/input/MembershipAssociationInput';

export const OrganizationEdit = props => (
  <Edit redirect="show" {...props}>
    <TabbedForm syncWithLocation={false} toolbar={<EditToolbarWithPermissions />}>
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
        <ArrayInput source="pair:homePage" fullWidth>
          <SimpleFormIterator disableReordering disableClear fullWidth>
            <TextInput fullWidth type="url" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="pair:e-mail" fullWidth type="email" />
        <LocationInput source="pair:hasLocation" fullWidth />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Membres">
        <MembershipAssociationInput
          source="pair:organizationOfMembership"
          referenceInputProps={{
            reference: "Person",
            source: "pair:membershipActor"
          }}
          label="Membre"
        />
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
