import React, { PropsWithChildren } from 'react';
import { EditBase, EditProps } from 'react-admin';
import { EditActionsWithPermissions } from '@semapps/auth-provider';
import { EditView } from '../index';
import { Container } from '@mui/material';

const Edit = ({ title, children, ...rest }: PropsWithChildren<EditProps>) => (
  <EditBase mutationMode="pessimistic" {...rest}>
    <Container disableGutters>
      <EditView title={title} actions={<EditActionsWithPermissions />}>
        {children}
      </EditView>
    </Container>
  </EditBase>
);

export default Edit;
