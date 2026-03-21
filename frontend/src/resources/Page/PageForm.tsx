import React from 'react';
import { required, TextInput, useTranslate } from 'react-admin';
import { useLoadLinks } from '@semapps/markdown-components';
import MarkdownInput from '../../common/input/MarkdownInput';

export const PageForm = () => {
  const translate = useTranslate();
  const translateHelper = (field: string) => translate(`resources.Page.fields.helpers.${field}`, { _: '' });
  const loadLinks = useLoadLinks('Page', 'semapps:title');

  return (
    <>
      <TextInput
        source="semapps:title"
        fullWidth
        validate={[required()]}
        helperText={translateHelper('semapps:title')}
      />
      <MarkdownInput
        source="semapps:content"
        loadSuggestions={loadLinks}
        suggestionTriggerCharacters={['[']}
        validate={[required()]}
        helperText={translateHelper('semapps:content')}
      />
    </>
  );
};

export default PageForm;
