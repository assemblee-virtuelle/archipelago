import React from 'react';
import { TextInput, useResourceContext } from 'react-admin';
import { CreateOrImportForm } from '@semapps/interop-components';
import { useDataModel } from '@semapps/semantic-data-provider';
import { Create } from './layout';

const CreateOrImport = props => {
  const resource = useResourceContext({});
  const dataModel = useDataModel(resource);
  return (
    <Create {...props}>
      <CreateOrImportForm stripProperties={['pair:topicOf', 'pair:producedBy', 'pair:offeredBy']}>
        {dataModel?.fieldsMapping?.title &&
          <TextInput source={dataModel?.fieldsMapping?.title} fullWidth />
        }
      </CreateOrImportForm>
    </Create>
  );
}

export default CreateOrImport;
