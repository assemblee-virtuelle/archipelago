import React from 'react';
import { useTranslate, getFieldLabelTranslationArgs, useShowContext } from 'react-admin';
import { Box } from '@mui/material';
import LargeLabel from './LargeLabel';

const MainList = ({ children, Label = LargeLabel }) => {
  const translate = useTranslate();
  const { isPending, isLoading, record, resource } = useShowContext();

  if (isPending || isLoading || !record) return null;

  return (
    <Box>
      {React.Children.map(children, field =>
        field && record[field.props.source] && (!Array.isArray(record[field.props.source]) || record[field.props.source].length > 0) && React.isValidElement(field) ? (
          <Box key={field.props.source} mb={8}>
            {field.props.label !== false ? (
              <>
                <Label>
                  {translate(
                    ...getFieldLabelTranslationArgs({
                      label: field.props.label,
                      resource,
                      source: field.props.source
                    })
                  )}
                </Label>
                {field}
              </>
            ) : (
              field
            )}
          </Box>
        ) : null
      )}
    </Box>
  );
};

export default MainList;
