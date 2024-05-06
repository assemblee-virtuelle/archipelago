import React, { useEffect } from 'react';
import { ArrayInput } from 'react-admin';
import { useController } from 'react-hook-form';

/**
 * JSON-LD format transforms a single-value array to simple value,
 * We need to implement an adapter component to react-admin ArrayInput
 * to transform back the simple value to single-value array.
 */

const JsonLDArrayInput = props => {
  const {
    field: { value, onChange }
  } = useController({ name: props.source });

  useEffect(() => {
    if (value && !Array.isArray(value)) {
      setTimeout(() => {
        onChange([value]);
      }, 0);
    }
  }, [value, onChange]);

  if (value && !Array.isArray(value)) return null;

  return <ArrayInput {...props} />;
};

export default JsonLDArrayInput;
