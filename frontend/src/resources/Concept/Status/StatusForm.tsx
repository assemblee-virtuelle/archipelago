import React from 'react';
import { TextInput, SelectArrayInput, useTranslate, required, useResourceContext, useResourceDefinitionContext } from 'react-admin';
import { StatusOptions } from '.';

type Props = {
  edit?: boolean;
};

const StatusForm = ({ edit = false }: Props) => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Status.fields.helpers.${field}`, { _: '' });

  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as StatusOptions;

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <SelectArrayInput
        source={edit ? "type" : "@type"}
        label={translate(`resources.Status.fields.type`)}
        fullWidth
        validate={[required()]}
        helperText={translateHelper('type')}
        choices={options.types.map((status) => ({
          id: status,
          name: `resources.Status.types.${status}`,
        }))}
      />
    </>
  );
};

export default StatusForm;
