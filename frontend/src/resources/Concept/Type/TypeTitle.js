import React from 'react';
import { useRecordContext } from 'react-admin';

const TypeTitle = () => {
  const record = useRecordContext();
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default TypeTitle;
