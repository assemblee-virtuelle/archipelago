import React from 'react';
import { required, TextInput, useTranslate } from 'react-admin';
import MarkdownInput from '../../../common/input/MarkdownInput';
import DropDownTreeSelect from '../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import { PairThemeRecord } from '.';

type Props = {
  recordId?: string;
};

export const ThemeForm = ({ recordId }: Props) => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Theme.fields.helpers.${field}`, { _: '' });

  const validateParent = (message: string) => (value: PairThemeRecord['pair:broader']) => {
    if (recordId && value === recordId) {
      return message;
    }
  };

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <DropDownTreeSelect
        source="pair:broader"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        helperText={translateHelper('pair:broader')}
        validate={validateParent(translate('resources.Theme.fields.validators.pair:broader.parent'))}
      />
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />
    </>
  );
};

export default ThemeForm;
