import React from 'react';
import { MarkdownField as SemAppsMarkdownField } from '@semapps/markdown-components';
import LargeLabel from "../list/MainList/LargeLabel";

const MarkdownField = props => (
  <SemAppsMarkdownField LabelComponent={LargeLabel} {...props} />
);

MarkdownField.defaultProps = {
  addLabel: true
};

export default MarkdownField;
