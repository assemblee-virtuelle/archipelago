import React from 'react';
import { ImageInput, TabbedForm, TextInput, FormTab } from 'react-admin';
import { ImageField } from '@semapps/field-components';
import { ActivitiesInput, SkillsInput, ThemesInput } from '../../../../common/input';
import ProfileTitle from './ProfileTitle';
import Edit from "../../../../layout/edit/Edit";

export const ProfileEdit = props => (
  <Edit title={<ProfileTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="vcard:given-name" fullWidth />
        <TextInput source="vcard:note" fullWidth />
        {/*<LocationInput source="pair:hasLocation" fullWidth />*/}
        <ImageInput source="vcard:photo" accept="image/*">
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

export default ProfileEdit;
