import React from 'react';
import { CreateOrImportForm } from '@semapps/interop-components';
import { useResourceContext, SimpleForm, useResourceDefinitionContext, useTranslate } from 'react-admin';
import { Create } from '../../../../common/layout';
import OrganizationForm from './OrganizationForm';
import { ResourceOptions } from '../../../index';

const OrganizationCreate = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as ResourceOptions;

  return (
    <Create title={translate('resources.Organization.create')} redirect="show">
      {options.isImportable ? (
        <CreateOrImportForm
          stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
          spacing={2}
          useFlexGap
        >
          <OrganizationForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} mode="onBlur" reValidateMode="onBlur">
          <OrganizationForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default OrganizationCreate;
