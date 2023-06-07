import React from 'react';
import { ImageField, TabbedForm, TextInput, FormTab } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { ActivitiesInput, LocationInput, SkillsInput, ThemesInput } from '../../../../common/input';
import PersonTitle from './PersonTitle';
import Edit from "../../../../layout/edit/Edit";

export const PersonEdit = props => (
  <Edit
    title={<PersonTitle />}
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
      <FormTab label="Relations">
        <ActivitiesInput source="pair:involvedIn" />
        <SkillsInput source="pair:offers" />
        <ThemesInput source="pair:hasTopic" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default PersonEdit;
