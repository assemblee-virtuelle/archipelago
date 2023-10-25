import React from 'react';
import { FormTab, TabbedForm, TextInput, useGetList, useGetRecordId } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { AgentsInput } from '../../../common/input';
import Edit from "../../../layout/edit/Edit";
import Title from "../../../layout/Title";
import CustomTreeSelectInput from '../../../common/input/TreeComponent/CustomTreeSelectInput';

export const ThemeEdit = props => {
  const recordId = useGetRecordId();

  const {data, isLoading} = useGetList("Theme", { page: 1, perPage: Infinity });
  if (isLoading) return null;

  const validateIds = data.filter((theme => theme.id !== recordId)).map(theme => theme.id);

  return (
    <Edit title={<Title />} redirect="show" {...props}>
      <TabbedForm>
        <FormTab label="Données">
          <TextInput source="pair:label" fullWidth />
          <MarkdownInput source="pair:description" fullWidth />
        </FormTab>
        <FormTab label="Relations">
          <AgentsInput source="pair:topicOf" />
          {/* <ReferenceInput label="Thème Parent" reference="Theme" source="pair:broader" >
              <TreeAutocompleteInput 
                label="Thème parent"
                optionText="pair:label" 
                treeReference="Theme" 
                parentProperty="pair:broader" 
                resettable={true} 
                // shouldRenderSuggestions={value => false} 
                defaultExpanded={true}
                validate={choices(validateIds, `La selection ne peut pas être l'élément courant`)}
              />
            </ReferenceInput> */}
            <CustomTreeSelectInput label="Thème Parent" source="pair:broader" reference="Theme" broader="pair:broader" fullWidth />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

export default ThemeEdit;
