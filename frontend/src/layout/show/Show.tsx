import React from 'react';
import { ShowBase, ShowProps } from 'react-admin';
import { ShowActionsWithPermissions } from '@semapps/auth-provider';
import ShowView from './ShowView';

const Show = ({ title, actions, children, ...rest }: ShowProps) => (
  <ShowBase {...rest}>
    <ShowView title={title} actions={actions || <ShowActionsWithPermissions />}>
      {children}
    </ShowView>
  </ShowBase>
);

export default Show;
