import React from 'react';
import { useList, ListContextProvider, useResourceContext, RaRecord } from 'react-admin';
import RightLabel from './RightLabel';
import { ChipList } from '../ChipList/ChipList';

type Props = {
  data: RaRecord[];
  isPending: boolean;
  label: string;
  source: string;
};

const AsyncSideList = ({ data, isPending, label, source }: Props) => {
  const resource = useResourceContext() as string;
  const listContext = useList({ data, isPending, resource });

  if (!data || data.length === 0) return null;

  return (
    <ListContextProvider value={{ ...listContext, resource }}>
      <RightLabel
        label={label}
        source={source}
      >
        <ChipList primaryText="pair:label" linkType="show" externalLinks />
      </RightLabel>
    </ListContextProvider>
  );
};

export default AsyncSideList;
