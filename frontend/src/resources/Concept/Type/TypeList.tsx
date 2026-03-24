import React from 'react';
import { useTranslate } from 'react-admin';
import StyleIcon from '@mui/icons-material/Style';
import SimpleList from '../../../common/list/SimpleList';
import { List } from '../../../common/layout';
import { PairTypeRecord } from '.';

const TypeList = () => {
  const translate = useTranslate();

  return (
    <List>
      <SimpleList
        primaryText={(record: PairTypeRecord) => record['pair:label']}
        secondaryText={(record: PairTypeRecord) =>
          Array.isArray(record.type)
            ? record.type.map((r) => translate(`resources.Type.types.${r}`)).join(', ')
            : translate(`resources.Type.types.${record.type}`)
        }
        leftAvatar={() => <StyleIcon />}
      />
    </List>
  );
};

export default TypeList;
