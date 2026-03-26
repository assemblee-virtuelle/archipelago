import React from 'react';
import { CreateOrImportForm } from '@semapps/interop-components';
import { useResourceContext, SimpleForm, useResourceDefinitionContext, useTranslate } from 'react-admin';
import { Create } from '../../../../common/layout';
import { ResourceOptions } from '../../../index';
import ProjectForm from './ProjectForm';

const ProjectCreate = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as ResourceOptions;

  return (
    <Create title={translate('resources.Project.create')} redirect="show">
      {options.isImportable ? (
        <CreateOrImportForm
          stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
          spacing={2}
          useFlexGap
        >
          <ProjectForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
          <ProjectForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default ProjectCreate;
