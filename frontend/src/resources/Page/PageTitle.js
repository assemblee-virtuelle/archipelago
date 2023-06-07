import React from 'react';
import { useRecordContext } from 'react-admin';

const PageTitle = () => {
  const record = useRecordContext();
  return <span>{record ? record['semapps:title'] : ''}</span>;
};

export default PageTitle;
