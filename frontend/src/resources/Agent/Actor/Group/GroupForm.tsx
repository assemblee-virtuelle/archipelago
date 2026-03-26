import React from 'react';
import { TextInput, ImageField, useTranslate, required } from 'react-admin';
import { ImageInput } from '@semapps/input-components';
import { UsersInput, EventsInput, DocumentsInput } from '../../../../common/input';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import LargeLabel from '../../../../common/list/MainList/LargeLabel';
import MarkdownInput from '../../../../common/input/MarkdownInput';

export const GroupForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Group.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <LargeLabel>{translate('resources.Group.form.basicInformation')}</LargeLabel>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>

      <LargeLabel>{translate('resources.Group.form.description')}</LargeLabel>
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />

      <LargeLabel>{translate('resources.Group.form.other')}</LargeLabel>
      <DropDownTreeSelect
        source="pair:hasTopic"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        multiple
        helperText={translateHelper('pair:hasTopic')}
      />
      <UsersInput source="pair:affiliates" helperText={translateHelper('pair:affiliates')} />
      <EventsInput source="pair:involvedIn" helperText={translateHelper('pair:involvedIn')} />
      <DocumentsInput source="pair:documentedBy" helperText={translateHelper('pair:documentedBy')} />
    </>
  );
};

export default GroupForm;
