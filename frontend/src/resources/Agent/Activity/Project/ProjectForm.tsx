import React from 'react';
import { ImageField, SelectInput, TextInput, ReferenceInput, useTranslate, required } from 'react-admin';
import { Stack } from '@mui/material';
import { ActorsInput, DocumentsInput, ResourcesInput } from '../../../../common/input';
import { ImageInput } from '@semapps/input-components';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import LargeLabel from '../../../../common/list/MainList/LargeLabel';
import MarkdownInput from '../../../../common/input/MarkdownInput';

const ProjectForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Project.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <LargeLabel>{translate('resources.Project.form.basicInformation')}</LargeLabel>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <Stack direction={{xs: "column", md: "row"}} spacing={2} sx={{ width: '100%' }}>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:ProjectType' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasType')} />
        </ReferenceInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:ProjectStatus' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasStatus')} />
        </ReferenceInput>
      </Stack>
      <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
        <ImageField source="src" />
      </ImageInput>

      <LargeLabel>{translate('resources.Project.form.description')}</LargeLabel>
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />

      <LargeLabel>{translate('resources.Project.form.contact')}</LargeLabel>
      <TextInput source="pair:homePage" fullWidth helperText={translateHelper('pair:homePage')} />

      <LargeLabel>{translate('resources.Project.form.other')}</LargeLabel>
      <DropDownTreeSelect
        source="pair:hasTopic"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        multiple
        helperText={translateHelper('pair:hasTopic')}
      />
      <ActorsInput source="pair:involves" helperText={translateHelper('pair:involves')} />
      <ResourcesInput source="pair:needs" helperText={translateHelper('pair:needs')} />
      <DocumentsInput source="pair:documentedBy" helperText={translateHelper('pair:documentedBy')} />
    </>
  );
};

export default ProjectForm;
