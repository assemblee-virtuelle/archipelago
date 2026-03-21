import React from 'react';
import { useTranslate, useResourceContext, useResourceDefinitionContext, SimpleForm } from 'react-admin';
import { CreateOrImportForm } from '@semapps/interop-components';
import { Create } from '../../../common/layout';
import { ResourceOptions } from '../..';
import DocumentForm from './DocumentForm';

export const DocumentCreate = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as ResourceOptions;

  return (
    <Create title={translate('resources.Document.create')} redirect="show">
      {options.isImportable ? (
        <CreateOrImportForm
          stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
          spacing={2}
          useFlexGap
        >
          <DocumentForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
          <DocumentForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default DocumentCreate;
