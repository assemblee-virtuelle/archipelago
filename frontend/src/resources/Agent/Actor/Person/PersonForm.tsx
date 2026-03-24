import React from 'react';
import { ImageField, TextInput, required, useTranslate } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { ActivitiesInput, LocationInput, SkillsInput } from '../../../../common/input';
import MembershipAssociationInput from '../../../../common/input/MembershipAssociationInput';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import LargeLabel from '../../../../common/list/MainList/LargeLabel';
import MarkdownInput from '../../../../common/input/MarkdownInput';

export const PersonForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Person.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <LargeLabel>{translate('resources.Person.form.basicInformation')}</LargeLabel>
      <TextInput
        source="pair:firstName"
        fullWidth
        validate={[required()]}
        helperText={translateHelper('pair:firstName')}
      />
      <TextInput source="pair:lastName" fullWidth helperText={translateHelper('pair:lastName')} />
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />
      <LocationInput source="pair:hasLocation" fullWidth helperText={translateHelper('pair:hasLocation')} />
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>

      <LargeLabel>{translate('resources.Person.form.other')}</LargeLabel>
      <ActivitiesInput source="pair:involvedIn" helperText={translateHelper('pair:involvedIn')} />
      <SkillsInput source="pair:offers" helperText={translateHelper('pair:offers')} />
      <DropDownTreeSelect
        source="pair:hasTopic"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        multiple
        helperText={translateHelper('pair:hasTopic')}
      />

      <LargeLabel>{translate('resources.Person.form.members')}</LargeLabel>
      <MembershipAssociationInput
        source="pair:actorOfMembership"
        referenceInputProps={{
          reference: 'Organization',
          source: 'pair:membershipOrganization',
        }}
        label="Organisation"
      />
    </>
  );
};

export default PersonForm;
