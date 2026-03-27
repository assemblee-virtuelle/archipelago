/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MarkdownInput as SemappsMarkdownInput } from '@semapps/markdown-components';
import { styled } from '@mui/material/styles';
import LargeLabel from '../list/MainList/LargeLabel';
import { Box } from '@mui/material';
import { CommonInputProps } from 'react-admin';

const StyledBox = styled(Box)(({ theme }) => ({
  '&': {
    width: '100%',
  },

  '& fieldset': {
    borderColor: theme.palette.grey[400],
  },

  '& textarea': {
    backgroundColor: theme.palette.inputBackgroundColor.main,
  },
}));

type Props = CommonInputProps & {
  loadSuggestions?: (keyword: string) => Promise<{ preview: any; value: string; }[]>;
  suggestionTriggerCharacters?: string[];
};

const MarkdownInput = ({ loadSuggestions, suggestionTriggerCharacters, ...props }: Props) => {
  return (
    <StyledBox>
      <SemappsMarkdownInput
        fullWidth
        overrides={{ h1: LargeLabel }}
        // @ts-expect-error Bad typing from semapps lib
        reactMdeProps={{
          l18n: {
            write: 'Saisie',
            preview: 'Prévisualisation',
            uploadingImage: '',
            pasteDropSelect: '',
          },
          toolbarCommands: [
            ['header', 'bold', 'italic', 'strikethrough'],
            ['link', 'quote', 'image'],
            ['unordered-list', 'ordered-list'],
          ],
          ...(loadSuggestions ? loadSuggestions : undefined),
          ...(suggestionTriggerCharacters ? suggestionTriggerCharacters : undefined),
        }}
        {...props}
      />
    </StyledBox>
  );
};

export default MarkdownInput;
