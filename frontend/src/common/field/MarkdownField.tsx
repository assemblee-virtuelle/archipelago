import React from 'react';
import { MarkdownField as SemAppsMarkdownField } from '@semapps/markdown-components';
import LargeLabel from "../list/MainList/LargeLabel";
import { FieldProps, useRecordContext } from 'react-admin';

type Props = FieldProps;

const MarkdownField = (props: Props) => {

  const record = useRecordContext();

  if (typeof record?.[props.source] === 'object') {
    return null;
  }

  return (
    <SemAppsMarkdownField LabelComponent={LargeLabel} {...props} />
  );
};

export default MarkdownField;
