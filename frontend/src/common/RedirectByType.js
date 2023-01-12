import React from 'react';
import { redirect } from 'react-router';

const RedirectByType = ({ record, typesMap }) => {
  if (record) {
    if (!Array.isArray(record.type)) record.type = [record.type];
    const matchingResource = Object.keys(typesMap).find(resource => record.type.includes(typesMap[resource]));
    if (matchingResource) {
      return redirect(`/${matchingResource}/${encodeURIComponent(record.id)}/show`);
    }
  }
  return null;
};

export default RedirectByType;
