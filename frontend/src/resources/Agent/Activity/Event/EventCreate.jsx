import React from "react";
import { CreateOrImportForm } from "@semapps/interop-components";
import { useResourceContext, SimpleForm } from "react-admin";
import Create from "../../../../layout/create/Create";
import EventForm from "./EventForm";
import config from '../../../../config';

const EventCreate = () => {
  const resource = useResourceContext();
  const isImportable = config.resources[resource].config?.options?.importable ?? true;

  return (
    <Create title={"Créer un nouvel évènement"} redirect="show">
      {isImportable ? (
        <CreateOrImportForm
          stripProperties={[
            "pair:topicOf",
            "pair:producedBy",
            "pair:offeredBy",
          ]}
          spacing={2}
          useFlexGap
        >
          <EventForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} useFlexGap>
          <EventForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default EventCreate;
