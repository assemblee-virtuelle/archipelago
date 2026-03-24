import React from 'react';
import { TextInput, SelectInput, ImageField, SimpleFormIterator, ArrayInput, ReferenceInput, useTranslate, required } from 'react-admin';
import { Stack, Typography } from '@mui/material';
import { ImageInput } from '@semapps/input-components';
import MarkdownInput from '../../../../common/input/MarkdownInput';
import { OrganizationsInput, DocumentsInput, LocationInput } from '../../../../common/input';
import MembershipAssociationInput from '../../../../common/input/MembershipAssociationInput';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import LargeLabel from '../../../../common/list/MainList/LargeLabel';

export const OrganizationForm = () => {
  const translate = useTranslate();

  const translateHelper = (field: string) => translate(`resources.Organization.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <LargeLabel>{translate('resources.Organization.form.basicInformation')}</LargeLabel>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <Stack direction={{xs: "column", md: "row"}} spacing={2} sx={{ width: '100%' }}>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:OrganizationType' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasType')} />
        </ReferenceInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:AgentStatus' }}>
          <SelectInput optionText="pair:label" size="small" fullWidth helperText={translateHelper('pair:hasStatus')} />
        </ReferenceInput>
      </Stack>
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>

      <LargeLabel>{translate('resources.Organization.form.description')}</LargeLabel>
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" helperText={translateHelper('pair:description')} />

      <LargeLabel>{translate('resources.Organization.form.contact')}</LargeLabel>
      <ArrayInput source="pair:homePage" fullWidth>
        <SimpleFormIterator disableReordering disableClear fullWidth>
          {/* @ts-expect-error bad typing */}
          <TextInput fullWidth type="url" helperText={translateHelper('pair:homePage')} />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="pair:e-mail" fullWidth type="email" helperText={translateHelper('pair:e-mail')}/>
      <LocationInput source="pair:hasLocation" fullWidth helperText={translateHelper('pair:hasLocation')} />

      <LargeLabel>{translate('resources.Organization.form.other')}</LargeLabel>
      <DropDownTreeSelect
        source="pair:hasTopic"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        multiple
        helperText={translateHelper('pair:hasTopic')}
      />
      <OrganizationsInput source="pair:partnerOf" helperText={translateHelper('pair:partnerOf')} />
      <DocumentsInput source="pair:documentedBy" helperText={translateHelper('pair:documentedBy')} />

      <LargeLabel>{translate('resources.Organization.form.members')}</LargeLabel>
      <Typography>{translate('resources.Organization.fields.helpers.pair:organizationOfMembership')}</Typography>
      <MembershipAssociationInput
        source="pair:organizationOfMembership"
        referenceInputProps={{
          reference: 'Person',
          source: 'pair:membershipActor',
        }}
      />
    </>
  );
};

export default OrganizationForm;
