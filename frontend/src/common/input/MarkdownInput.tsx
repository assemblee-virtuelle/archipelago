import React from 'react';
import { MarkdownInput as SemappsMarkdownInput } from '@semapps/markdown-components';
import LargeLabel from '../list/MainList/LargeLabel';

type Props = {
  source: string;
  helperText?: string;
};

const MarkdownInput = ({ source, helperText }: Props) => {
  return (
    <SemappsMarkdownInput
      source={source}
      fullWidth
      helperText={helperText}
      overrides={{ h1: LargeLabel }}
      // @ts-expect-error Bad typing from semapps lib
      reactMdeProps={{
        l18n: {
          write: 'Saisie',
          preview: 'Prévisualisation',
          uploadingImage: '',
          pasteDropSelect: ''
        },
        toolbarCommands: [
          ['header', 'bold', 'italic', 'strikethrough'],
          ['link', 'quote', 'image'],
          ['unordered-list', 'ordered-list'],
        ],
      }}
    />
  );
};

export default MarkdownInput;
