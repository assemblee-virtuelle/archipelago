import React from 'react';
import { ReferenceArrayInput, MultiServerAutocompleteArrayInput } from '@semapps/input-components';
import { CommonInputProps } from 'react-admin';

const ifTwoLetters = ({ q }: { q: string }) => !!(q && q.length > 1);
const filterOnlyLabel = { _predicates: ['pair:label'] };

export const OrganizationsInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput
    reference="Organization"
    source={source}
    enableGetChoices={ifTwoLetters}
    filter={filterOnlyLabel}
  >
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const ActorsInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Actor" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      size="small"
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const ResourcesInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Resource" source={source} enableGetChoices={ifTwoLetters}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const ActivitiesInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Activity" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const DocumentsInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Document" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const EventsInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Event" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const TasksInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Task" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const SkillsInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Skill" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const UsersInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Person" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export const AgentsInput = ({ source, helperText }: CommonInputProps) => (
  <ReferenceArrayInput reference="Agent" source={source} enableGetChoices={ifTwoLetters} filter={filterOnlyLabel}>
    <MultiServerAutocompleteArrayInput
      optionText="pair:label"
      shouldRenderSuggestions={(value: string) => value.length > 1}
      noOptionsText="Veuillez saisir au moins deux lettres"
      fullWidth
      helperText={helperText}
    />
  </ReferenceArrayInput>
);

export { default as DateTimeInput } from './DateTimeInput';
export { default as LocationInput } from './LocationInput';
