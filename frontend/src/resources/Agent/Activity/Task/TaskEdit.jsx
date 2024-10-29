import React from 'react';
import { FormTab, TextInput, SelectInput, TabbedForm, ReferenceInput } from 'react-admin';
import { ActorsInput, ThemesInput, TasksInput, SkillsInput, DocumentsInput, ActivitiesInput } from '../../../../common/input';
import { MarkdownInput } from '@semapps/markdown-components';
import { EditToolbarWithPermissions } from '@semapps/auth-provider';
import { DateTimeInput } from "../../../../common/input";
import { Edit } from '../../../../common/layout';

const TaskEdit = props => (
  <Edit redirect="show" {...props}>
    <TabbedForm syncWithLocation={false} toolbar={<EditToolbarWithPermissions />}>
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <MarkdownInput source="pair:description" fullWidth />
        <ReferenceInput reference="Status" source="pair:hasStatus" filter={{ a: 'pair:TaskStatus' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ReferenceInput reference="Type" source="pair:hasType" filter={{ a: 'pair:TaskType' }}>
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <DateTimeInput source="pair:dueDate" />
        <DateTimeInput source="pair:endDate" />
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
