import React from 'react';
import { TextInput } from 'react-admin';
import { CreateOrImportForm } from '@semapps/interop-components';
import { useDataModel } from '@semapps/semantic-data-provider';
import Create from "../layout/create/Create";

const CreateOrImport = props => {
  const dataModel = useDataModel(props.resource);
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
