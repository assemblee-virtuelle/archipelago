import React from 'react';
import { FormTab, TextInput, TabbedForm } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ActorsInput, ThemesInput, DateTimeInput } from '../../../../common/input';
import Edit from "../../../../layout/edit/Edit";
import EventTitle from './EventTitle';

const EventEdit = props => (
  <Edit title={<EventTitle />} {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Données">
        <TextInput source="pair:label" fullWidth />
        <TextInput source="pair:comment" fullWidth />
        <MarkdownInput multiline source="pair:description" fullWidth />
        <TextInput source="pair:aboutPage" fullWidth />
        <DateTimeInput source="pair:startDate" />
        <DateTimeInput source="pair:endDate" />
      </FormTab>
      <FormTab label="Relations">
        <ActorsInput source="pair:involves" />
        <ThemesInput source="pair:hasTopic" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default EventEdit;
