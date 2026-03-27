import React, { PropsWithChildren } from 'react';
import { CreateActions, CreateBase, SimpleForm, useResourceContext, useResourceDefinition, useTranslate } from 'react-admin';
import { CreateOrImportForm } from '@semapps/interop-components';
import { CreateView } from '../index';
import { Container } from '@mui/material';
import { ResourceOptions } from '../../../resources';

const Create = ({ children }: PropsWithChildren) => {
  const translate = useTranslate();
  const resource = useResourceContext();
  const resourceContext = useResourceDefinition();
  const options = resourceContext.options as ResourceOptions;

  return (
    <CreateBase redirect="show">
      <Container disableGutters>
        <CreateView actions={<CreateActions />} title={translate(`resources.${resource}.create`)}>
          {options.isImportable ? (
            <CreateOrImportForm
              stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}
              spacing={2}
              useFlexGap
            >
              {children}
            </CreateOrImportForm>
          ) : (
            <SimpleForm spacing={2} useFlexGap mode="onBlur" reValidateMode="onBlur">
              {children}
            </SimpleForm>
          )}
        </CreateView>
      </Container>
    </CreateBase>
  );
};

export default Create;
