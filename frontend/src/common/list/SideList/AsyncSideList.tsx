import React from 'react';
import { RaRecord } from 'react-admin';
import RightLabel from './RightLabel';
import { ChipList } from '../ChipList/ChipList';

type Props = {
  data: RaRecord[];
  isPending: boolean;
  label: string;
  source: string;
};

const AsyncSideList = ({ data, label, source }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <RightLabel label={label} source={source}>
      <ChipList primaryText="pair:label" linkType="show" externalLinks />
    </RightLabel>
  );
};

export default AsyncSideList;
