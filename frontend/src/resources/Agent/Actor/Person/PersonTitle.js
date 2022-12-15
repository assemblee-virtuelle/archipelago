import React from 'react';

const PersonTitle = ({ record }) => {
  return <span>{record ? record['vcard:given-name'] : ''}</span>;
};

export default PersonTitle;
