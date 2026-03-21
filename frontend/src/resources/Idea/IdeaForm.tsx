import React from 'react';
import { TextInput, SelectInput, ReferenceInput, useTranslate, required } from 'react-admin';
import { Stack } from '@mui/material';
import { ActorsInput, ActivitiesInput } from '../../common/input';
import MarkdownInput from '../../common/input/MarkdownInput';

const IdeaForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Idea.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <TextInput source="pair:comment" fullWidth helperText={translateHelper('pair:comment')} />
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />
      <Stack direction={{xs: "column", md: "row"}} spacing={2} sx={{ width: '100%' }}>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:IdeaType' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasType')} />
        </ReferenceInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:IdeaStatus' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasStatus')} />
        </ReferenceInput>
      </Stack>
      <ActorsInput source="pair:brainstormedBy" helperText={translateHelper('pair:brainstormBBy')} />
      <ActivitiesInput source="pair:concretizedBy" helperText={translateHelper('pair:concretizedBy')} />
    </>
  );
};

export default IdeaForm;
