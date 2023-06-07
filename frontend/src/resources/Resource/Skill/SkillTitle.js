import React from 'react';
import { useRecordContext } from 'react-admin';

const SkillTitle = () => {
  const record = useRecordContext();
  return <span>{record ? record['pair:label'] : ''}</span>;
};

export default SkillTitle;
