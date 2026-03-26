import React from 'react';
import { CreateOrImportForm } from '@semapps/interop-components';
import { useResourceContext, SimpleForm, useResourceDefinitionContext, useTranslate } from 'react-admin';
import { Create } from '../../../../common/layout';
import { ResourceOptions } from '../../../index';
import TaskForm from './TaskForm';

const TaskCreate = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as ResourceOptions;

  return (
    <Create title={translate('resources.Task.create')} redirect="show">
      {options.isImportable ? (
        <CreateOrImportForm
          stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
          spacing={2}
          useFlexGap
        >
          <TaskForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
          <TaskForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default TaskCreate;
