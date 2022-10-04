import React from 'react';
import { FormTab, TextInput, SelectInput, TabbedForm } from 'react-admin';
import frLocale from 'date-fns/locale/fr';
import { ActorsInput, ThemesInput, TasksInput, SkillsInput, DocumentsInput, ActivitiesInput } from '../../../../common/input';
import { ReferenceInput } from '@semapps/input-components';
import { DateTimeInput } from '@semapps/date-components';
import { MarkdownInput } from '@semapps/markdown-components';
import TaskTitle from './TaskTitle';
import Edit from "../../../../layout/edit/Edit";

const TaskEdit = props => (
  <Edit title={<TaskTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:TaskStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:TaskType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <DateTimeInput
          source="pair:dueDate"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false
          }}
          providerOptions={{
            locale: frLocale
          }}
          fullWidth
        />
        <DateTimeInput
          source="pair:endDate"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false
          }}
          providerOptions={{
            locale: frLocale
          }}
          fullWidth
        />
      </FormTab>
      <FormTab label="Relations">
        <ActorsInput source="pair:assignedTo" />
        <ActivitiesInput source="pair:partOf" />
        <ActorsInput source="pair:hasFollower" />
        <ActorsInput source="pair:involves" />
        <TasksInput source="pair:inspiredBy" />
        <ThemesInput source="pair:hasTopic" />
        <SkillsInput source="pair:needs" />
        <DocumentsInput source="pair:uses" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default TaskEdit;
