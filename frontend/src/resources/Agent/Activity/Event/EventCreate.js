import React from "react";
import Create from "../../../../layout/create/Create";
import EventForm from "./EventForm";

const EventCreate = () => {
  return (
    <Create title={"Créer un nouvel évènement"} redirect="show">
      <EventForm />
    </Create>
  );
};

export default EventCreate;
