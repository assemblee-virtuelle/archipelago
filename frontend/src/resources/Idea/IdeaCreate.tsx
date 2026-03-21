import React from 'react';
import { useTranslate, useResourceContext, useResourceDefinitionContext, SimpleForm } from 'react-admin';
import { CreateOrImportForm } from '@semapps/interop-components';
import { Create } from '../../common/layout';
import { ResourceOptions } from '..';
import IdeaForm from './IdeaForm';

export const IdeaCreate = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as ResourceOptions;

  return (
    <Create title={translate('resources.Idea.create')} redirect="show">
      {options.isImportable ? (
        <CreateOrImportForm
          stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
          spacing={2}
          useFlexGap
        >
          <IdeaForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
          <IdeaForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default IdeaCreate;
