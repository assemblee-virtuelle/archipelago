import React from 'react';
import { FormTab, TabbedForm, TextInput, useGetRecordId } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { AgentsInput } from '../../../common/input';
import { Edit } from '../../../common/layout';
import DropDownTreeSelect from '../../../common/input/DropdownTreeSelect/DropdownTreeSelect';

export const ThemeEdit = props => {
  const recordId = useGetRecordId();

  const validateParent = (message) => (value) => {
    if (value === recordId) {
      return message;
    }
  };

  return (
    <Edit redirect="show" {...props}>
      <TabbedForm syncWithLocation={false} toolbar={<EditToolbarWithPermissions />}>
        <FormTab label="Données">
          <TextInput source="pair:label" fullWidth />
          <MarkdownInput source="pair:description" fullWidth />
        </FormTab>
        <FormTab label="Relations">
          <AgentsInput source="pair:topicOf" />
          <DropDownTreeSelect
            label="Thème Parent"
            source="pair:broader"
            reference="Theme"
            helperText="Choisissez un thème qui sera le parent de celui-ci dans l'arborescence."
            validate={validateParent(`Le thème ne peut pas être son propre parent`)}
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ThemeEdit;
