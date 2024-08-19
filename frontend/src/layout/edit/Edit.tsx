import React, { PropsWithChildren } from 'react';
import { EditBase, EditProps } from 'react-admin';
import { EditActionsWithPermissions } from '@semapps/auth-provider';
import { EditView } from '../index';

const Edit = ({ title, actions, children, ...rest }: PropsWithChildren<EditProps>) => (
  <EditBase mutationMode="pessimistic" {...rest}>
    <EditView title={title} actions={actions || <EditActionsWithPermissions />}>
      {children}
    </EditView>
  </EditBase>
);

export default Edit;
