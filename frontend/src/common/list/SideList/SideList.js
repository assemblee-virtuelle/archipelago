import React from 'react';
import { useShowContext } from 'react-admin';
import RightLabel from './RightLabel';

const SideList = ({ children }) => {
  const { isLoading, record } = useShowContext();
  if (isLoading) return null;

  return React.Children.map(children, field =>
    field && record[field.props.source] && (Array.isArray(record[field.props.source]) && record[field.props.source].length > 0) && React.isValidElement(field) ? (
      <div key={field.props.source}>
        {field.props.label !== false ? (
          <RightLabel
            label={field.props.label}
            source={field.props.source}
            disabled={false}
          >
            {field}
          </RightLabel>
        ) : (
          field
        )}
      </div>
    ) : null
  );
};

export default SideList;
