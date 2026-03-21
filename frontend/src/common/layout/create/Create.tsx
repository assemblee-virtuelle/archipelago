import React, { PropsWithChildren } from 'react';
import { CreateActions, CreateBase, CreateProps } from 'react-admin';
import { CreateView } from '../index';
import { Container } from '@mui/material';

const Create = ({ title, children, ...rest }: PropsWithChildren<CreateProps>) => (
  <CreateBase {...rest}>
    <Container disableGutters>
      <CreateView actions={<CreateActions />} title={title}>
        {children}
      </CreateView>
    </Container>
  </CreateBase>
);

export default Create;
