import React from 'react';
import { SimpleList as RaSimpleList, SimpleListProps, useCreatePath } from 'react-admin';
import useShortId from '../useShortId';
import config from '../../config';

const SimpleList = (props: SimpleListProps) => {
  const getShortId = useShortId();
  const createPath = useCreatePath();

  return (
    <RaSimpleList
      {...props}
      rowSx={() => ({
        padding: 2,
        paddingBottom: 2,
        paddingTop: 2,
        marginBottom: 1,
        borderStyle: 'solid',
        borderColor: 'grey.300',
        borderWidth: 1,
      })}
      rowClick={(recordId, resource) => {
        const { loading, shortId, fullId } = getShortId(recordId.toString());

        if (loading) {
          return false;
        }

        if (!loading && !shortId) {
          return 'show';
        }

        return createPath({ resource, type: 'show', id: `${config.useShortId ? shortId : fullId}` });
      }}
    />
  );
};

export default SimpleList;
