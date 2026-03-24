import React from 'react';
import { ReferenceArrayInput, MultiServerAutocompleteArrayInput } from "@semapps/input-components";

const ifTwoLetters = ({ q }) => !!(q && q.length > 1);
const filterOnlyLabel = { _predicates: ['pair:label'] };

export const OrganizationsInput = ({ source, helperText }) => (
  <ReferenceArrayInput reference="Organization" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth helperText={helperText} />
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

export const ActivitiesInput = ({ source, helperText }) => (
  <ReferenceArrayInput reference="Activity" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth helperText={helperText} />
  </ReferenceArrayInput>
);

export const DocumentsInput = ({ source, helperText }) => (
  <ReferenceArrayInput reference="Document" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth helperText={helperText} />
  </ReferenceArrayInput>
);

export const EventsInput = ({ source, helperText }) => (
  <ReferenceArrayInput reference="Event" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth helperText={helperText} />
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

export const UsersInput = ({ label, source }) => (
  <ReferenceArrayInput label={label} reference="Person" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth />
  </ReferenceArrayInput>
);

export const AgentsInput = ({ source, helperText }) => (
  <ReferenceArrayInput reference="Agent" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} noOptionsText="Tapez au moins deux lettres" fullWidth helperText={helperText} />
  </ReferenceArrayInput>
);

export { default as DateTimeInput } from './DateTimeInput';
export { default as LocationInput } from './LocationInput';
