import React from 'react';
import { styled } from '@mui/material/styles';
import { ChipList as SemappsChipList } from "@semapps/list-components";

const ChipContainer = styled('div')(() => ({
  maxWidth: 'calc(100vw - 80px)',
  '& > a': {
    margin: 1
  }
}));

const SmallChipContainer = styled(ChipContainer)(({ theme }) => ({
  '& .MuiChip-root': {
    height: theme.spacing(3)
  }
}));

type Props = {
  primaryText: string;
  linkType: string;
  externalLinks?: boolean;
};

const SmallChipList = (props: Props) => {
  return <SemappsChipList {...props} component={SmallChipContainer} />;
}

const ChipList = (props: Props) => {
  return <SemappsChipList {...props} externalLinks component={ChipContainer} />;
}

export {
  SmallChipList,
  ChipList,
};
