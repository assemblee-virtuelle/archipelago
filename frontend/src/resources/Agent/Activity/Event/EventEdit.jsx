import React from "react";
import Edit from "../../../../layout/edit/Edit";
import EventForm from "./EventForm";
import { SimpleForm } from "react-admin";

const EventEdit = (props) => (
  <Edit redirect="show" {...props}>
    <SimpleForm spacing={2} useFlexGap>
      <EventForm />
    </SimpleForm>
  </Edit>
);

export default EventEdit;
