import React from 'react';
import { useTranslate } from 'react-admin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SimpleList from '../../../common/list/SimpleList';
import { List } from '../../../common/layout';
import { PairStatusRecord } from '.';

const StatusList = () => {
  const translate = useTranslate();

  return (
    <List>
      <SimpleList
        primaryText={(record: PairStatusRecord) => record['pair:label']}
        secondaryText={(record: PairStatusRecord) =>
          Array.isArray(record.type)
            ? record.type.map((r) => translate(`resources.Status.types.${r}`)).join(', ')
            : translate(`resources.Status.types.${record.type}`)
        }
        leftAvatar={() => <VisibilityIcon />}
      />
    </List>
  );
};

export default StatusList;
