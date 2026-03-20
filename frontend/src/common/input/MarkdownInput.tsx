import React from 'react';
import { MarkdownInput as SemappsMarkdownInput } from '@semapps/markdown-components';
import { styled } from '@mui/material/styles';
import LargeLabel from '../list/MainList/LargeLabel';
import { Box } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  '&': {
    width: '100%',
  },

  '& fieldset': {
    borderColor: theme.palette.grey[400],
  },

  '& textarea': {
    backgroundColor: theme.palette.grey[200],
  },
}));

type Props = {
  source: string;
  helperText?: string;
};

const MarkdownInput = ({ source, helperText }: Props) => {
  return (
    <StyledBox>
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
            pasteDropSelect: '',
          },
          toolbarCommands: [
            ['header', 'bold', 'italic', 'strikethrough'],
            ['link', 'quote', 'image'],
            ['unordered-list', 'ordered-list'],
          ],
        }}
      />
    </StyledBox>
  );
};

export default MarkdownInput;
