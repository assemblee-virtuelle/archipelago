import React from "react";
import { SimpleForm } from "react-admin";
import { EditToolbarWithPermissions } from "@semapps/auth-provider";
import { Edit } from "../../../../layout";
import EventForm from "./EventForm";

const EventEdit = (props) => (
  <Edit redirect="show" {...props}>
    <SimpleForm spacing={2} useFlexGap toolbar={<EditToolbarWithPermissions />}>
      <EventForm />
    </SimpleForm>
  </Edit>
);

export default EventEdit;
