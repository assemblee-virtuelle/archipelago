import React from 'react';
import { useTranslate, SimpleForm, useResourceContext, useResourceDefinitionContext } from 'react-admin';
import { CreateOrImportForm } from '@semapps/interop-components';
import { Create } from '../../../common/layout';
import SkillForm from './SkillForm';
import { ResourceOptions } from '../..';

const SkillCreate = () => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinitionContext();
  const options = resourceContext.definitions[resource as string].options as ResourceOptions;

  return (
    <Create title={translate('resources.Skill.create')} redirect="show">
      {options.isImportable ? (
        <CreateOrImportForm
          stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
          spacing={2}
          useFlexGap
        >
          <SkillForm />
        </CreateOrImportForm>
      ) : (
        <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
          <SkillForm />
        </SimpleForm>
      )}
    </Create>
  );
};

export default SkillCreate;
