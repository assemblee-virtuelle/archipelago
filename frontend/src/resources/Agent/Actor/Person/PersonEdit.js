import React from 'react';
import { ImageField, TabbedForm, TextInput, FormTab, AutocompleteInput, SelectInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import { ImageInput } from '@semapps/input-components';
import { ActivitiesInput, LocationInput, SkillsInput, ThemesInput } from '../../../../common/input';
import Edit from "../../../../layout/edit/Edit";
import ReificationArrayInput from '../../../../common/input/ReificationArrayInput';

export const PersonEdit = props => (
  <Edit
    redirect="show"
    transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${data['pair:lastName']?.toUpperCase()}` })}
    {...props}
  >
    <TabbedForm>
      <FormTab label="Données">
        <TextInput source="pair:firstName" fullWidth />
        <TextInput source="pair:lastName" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <LocationInput source="pair:hasLocation" fullWidth />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
      </FormTab>
      {/* <FormTab label="Rôles">
        <ReificationArrayInput source="pair:actorOfMembership" reificationClass="pair:MembershipAssociation"  >
          <ReferenceInput reference="Organization" source="pair:membershipOrganization">
          <AutocompleteInput label="Organization" optionText="pair:label"
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
      </FormTab> */}
      <FormTab label="Relations">
        <ActivitiesInput source="pair:involvedIn" />
        <SkillsInput source="pair:offers" />
        <ThemesInput source="pair:hasTopic" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default PersonEdit;