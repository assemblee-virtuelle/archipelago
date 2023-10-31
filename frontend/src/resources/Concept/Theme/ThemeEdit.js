import React from 'react';
import { FormTab, TabbedForm, TextInput, useGetList, useGetRecordId, choices } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import CustomTreeSelectInput from '../../../common/input/TreeComponent/CustomTreeSelectInput';

export const ThemeEdit = props => {
  const recordId = useGetRecordId();

  const {data, isLoading} = useGetList("Theme", { page: 1, perPage: Infinity });
  if (isLoading) return null;

  const validateIds = data.filter((theme => theme.id !== recordId)).map(theme => theme.id);
  
  return (
    <Edit redirect="show" {...props}>
      <TabbedForm>
        <FormTab label="Données">
          <TextInput source="pair:label" fullWidth />
          <MarkdownInput source="pair:description" fullWidth />
        </FormTab>
        <FormTab label="Relations">
          <AgentsInput source="pair:topicOf" />
          <CustomTreeSelectInput 
            label="Thème Parent" 
            source="pair:broader" 
            reference="Theme" 
            broader="pair:broader" 
            validate={choices(validateIds, `La selection ne peut pas être l'élément courant`)}
            fullWidth 
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ThemeEdit;
