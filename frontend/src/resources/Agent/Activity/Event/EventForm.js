import React from "react";
import {
  TextInput,
  required,
  ImageField,
  minValue,
} from "react-admin";
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from "@semapps/input-components";
import {
  ActorsInput,
  ThemesInput,
  DateTimeInput,
  LocationInput,
} from "../../../../common/input";

import LargeLabel from "../../../../common/list/MainList/LargeLabel";
import { Stack } from "@mui/material";
import { useWatch } from "react-hook-form";

const EndDateInput = () => {
  const startDate = useWatch({ name: 'pair:startDate' });

  return (
    <DateTimeInput
      source="pair:endDate"
      disablePast
      helperText="La date de fin est optionnelle"
      minDateTime={new Date(startDate)}
      validate={[minValue(startDate, 'La date de fin est incorrecte')]}
    />
  );
};

const EventForm = () => {
  return (
    <>
      <LargeLabel>Informations de base</LargeLabel>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <Stack direction="row" useFlexGap spacing={2}>
        <DateTimeInput
          source="pair:startDate"
          validate={[required()]}
          disablePast
        />
        <EndDateInput />
      </Stack>
      <LocationInput source="pair:hasLocation" fullWidth />

      <LargeLabel>Description</LargeLabel>
      <TextInput
        source="pair:comment"
        fullWidth
        helperText="Décrivez votre évènement en quelques mots"
      />
      <MarkdownInput
        source="pair:description"
        fullWidth
        helperText="Décrivez plus précisément votre évènement (programme, intervenant·e·s, etc.)"
        overrides={{ h1: LargeLabel }}
        reactMdeProps={{
          l18n: {
            write: "Saisie",
            preview: "Prévisualisation",
          },
          toolbarCommands: [
            ["header", "bold", "italic", "strikethrough"],
            ["link", "quote", "image"],
            ["unordered-list", "ordered-list"],
          ],
        }}
      />

      <LargeLabel>Autres informations</LargeLabel>
      <ActorsInput
        source="pair:involves"
        helperText="Indiquez ici les organisations, groupes ou personnes qui sont impliqués dans l'évènement"
      />
      <ThemesInput source="pair:hasTopic" />
      <TextInput
        source="pair:aboutPage"
        fullWidth
        label="Page web de l'évènement"
        helperText="Billetterie, page d'inscription, etc."
      />
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      </>
  );
};

export default EventForm;
