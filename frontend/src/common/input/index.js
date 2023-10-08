import React from 'react';
import { AutocompleteArrayInput } from 'react-admin';
import { ReferenceArrayInput, MultiServerAutocompleteArrayInput } from "@semapps/input-components";
import { LexiconCreateDialog, fetchWikidata } from '@semapps/interop-components';

const ifTwoLetters = ({ q }) => !!(q && q.length > 1);
const filterOnlyLabel = { _predicates: ['pair:label'] };

export const OrganizationsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Organization" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const ActorsInput = ({ source, ...props }) => (
  <ReferenceArrayInput reference="Actor" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth size="small" {...props} />
  </ReferenceArrayInput>
);

export const ResourcesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Resource" source={source} enableGetChoices={ifTwoLetters}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const ActivitiesInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Activity" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const DocumentsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Document" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const EventsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Event" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const TasksInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Task" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const SkillsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Skill" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const ThemesInput = ({ source, ...props }) => (
  <ReferenceArrayInput reference="Theme" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <AutocompleteArrayInput
      optionText="pair:label"
      create={
        <LexiconCreateDialog
          fetchLexicon={fetchWikidata()}
          selectData={data => ({
            'pair:label': data.label,
            'pair:comment': data.summary,
            'http://www.w3.org/ns/prov#wasDerivedFrom': data.uri,
          })}
      />}
      fullWidth
      size="small"
      {...props}
    />
  </ReferenceArrayInput>
);

export const UsersInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Person" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const AgentsInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Agent" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export { default as DateTimeInput } from './DateTimeInput';
export { default as LocationInput } from './LocationInput';
