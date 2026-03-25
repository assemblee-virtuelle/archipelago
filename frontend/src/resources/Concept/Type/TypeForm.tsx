import React from 'react';
import { TextInput, SelectArrayInput, useTranslate, useResourceDefinitionContext, useResourceContext, required } from 'react-admin';
import { TypeOptions } from '.';

type Props = {
  edit?: boolean;
};

const TypeForm = ({ edit = false }: Props) => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Type.fields.helpers.${field}`, { _: '' });

  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as TypeOptions;

  return (
    <>
      <TextInput source="pair:label" fullWidth validate={[required()]} helperText={translateHelper('pair:label')} />
      <SelectArrayInput
        source={edit ? "type" : "@type"}
        label={translate(`resources.Type.fields.type`)}
        fullWidth
        validate={[required()]}
        helperText={translateHelper('type')}
        choices={options.types.map((status) => ({
          id: status,
          name: `resources.Type.types.${status}`,
        }))}
      />
    </>
  );
};

export default TypeForm;
