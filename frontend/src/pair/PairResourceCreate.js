import React from 'react';
import { TextInput } from 'react-admin';
import { Create } from '@semapps/archipelago-layout';
import { CreateOrImportForm } from '@semapps/interop-components';
import { useDataModel } from '@semapps/semantic-data-provider';

const PairResourceCreate = props => {
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

export default PairResourceCreate;
