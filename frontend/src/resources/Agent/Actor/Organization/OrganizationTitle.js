import React from 'react';
import { useRecordContext } from 'react-admin';

const OrganizationTitle = () => {
  const record = useRecordContext();
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default OrganizationTitle;
