import React, { PropsWithChildren } from 'react';
import { EditBase, EditProps } from 'react-admin';
import { EditActionsWithPermissions } from '@semapps/auth-provider';
import { EditView } from '../index';

const Edit = ({ title, children, ...rest }: PropsWithChildren<EditProps>) => (
  <EditBase mutationMode="pessimistic" {...rest}>
    <EditView title={title} actions={<EditActionsWithPermissions />}>
      {children}
    </EditView>
  </EditBase>
);

export default Edit;
