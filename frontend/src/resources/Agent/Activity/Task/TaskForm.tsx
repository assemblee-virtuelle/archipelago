import React from 'react';
import { TextInput, SelectInput, ReferenceInput, useTranslate, required } from 'react-admin';
import { Stack } from '@mui/material';
import { ActorsInput, TasksInput, SkillsInput, DocumentsInput, ActivitiesInput } from '../../../../common/input';
import { DateTimeInput } from '../../../../common/input';
import DropDownTreeSelect from '../../../../common/input/DropdownTreeSelect/DropdownTreeSelect';
import LargeLabel from '../../../../common/list/MainList/LargeLabel';
import MarkdownInput from '../../../../common/input/MarkdownInput';

const TaskForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Project.fields.helpers.${field}`, { _: '' });

  return (
    <>
      <LargeLabel>{translate('resources.Task.form.basicInformation')}</LargeLabel>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <Stack direction={{xs: "column", md: "row"}} spacing={2} sx={{ width: '100%' }}>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:TaskType' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasType')} />
        </ReferenceInput>
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:TaskStatus' }}>
          <SelectInput optionText="pair:label" fullWidth helperText={translateHelper('pair:hasStatus')} />
        </ReferenceInput>
      </Stack>
      <Stack direction="row" useFlexGap spacing={2}>
        <DateTimeInput source="pair:dueDate" helperText={translateHelper('pair:dueDate')} />
        <DateTimeInput source="pair:endDate" helperText={translateHelper('pair:endDate')} />
      </Stack>

      <LargeLabel>{translate('resources.Task.form.description')}</LargeLabel>
      <MarkdownInput source="pair:description" fullWidth helperText={translateHelper('pair:description')} />

      <LargeLabel>{translate('resources.Task.form.other')}</LargeLabel>
      <ActorsInput source="pair:assignedTo" helperText={translateHelper('pair:assignedTo')} />
      <ActivitiesInput source="pair:partOf" helperText={translateHelper('pair:partOf')} />
      <ActorsInput source="pair:hasFollower" helperText={translateHelper('pair:hasFollower')} />
      <ActorsInput source="pair:involves" helperText={translateHelper('pair:involves')} />
      <TasksInput source="pair:inspiredBy" helperText={translateHelper('pair:inspiredBy')} />
      <DropDownTreeSelect
        source="pair:hasTopic"
        reference="Theme"
        labelKey="pair:label"
        parentKey="pair:broader"
        multiple
        helperText={translateHelper('pair:hasTopic')}
      />
      <SkillsInput source="pair:needs" helperText={translateHelper('pair:needs')} />
      <DocumentsInput source="pair:uses" helperText={translateHelper('pair:uses')} />
    </>
  );
};

export default TaskForm;
