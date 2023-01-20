import React from 'react';
import { useShowContext } from 'react-admin';
import RightLabel from './RightLabel';

const SideList = ({ children }) => {
  const { basePath, isLoading, record, resource } = useShowContext();
  if (isLoading) return null;

  return React.Children.map(children, field =>
    field && React.isValidElement(field) ? (
      <div key={field.props.source}>
        {field.props.label !== false ? (
          <RightLabel
            record={record}
            resource={resource}
            basePath={basePath}
            label={field.props.label}
            source={field.props.source}
            disabled={false}
          >
            {field}
          </RightLabel>
        ) : typeof field.type === 'string' ? (
          field
        ) : (
          React.cloneElement(field, {
            record,
            resource,
            basePath
          })
        )}
      </div>
    ) : null
  );
};

export default SideList;
