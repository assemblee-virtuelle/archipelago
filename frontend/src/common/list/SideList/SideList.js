import React from 'react';
import { useShowContext } from 'react-admin';
import RightLabel from './RightLabel';

const SideList = ({ children }) => {
  const { isLoading } = useShowContext();
  if (isLoading) return null;

  return React.Children.map(children, field =>
    field && React.isValidElement(field) ? (
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
