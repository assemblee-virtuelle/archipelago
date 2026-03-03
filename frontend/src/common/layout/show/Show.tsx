import React from 'react';
import { ShowBase, ShowProps } from 'react-admin';
import { ShowActionsWithPermissions } from '@semapps/auth-provider';
import { ShowView } from '../index';

const Show = ({ title, children, ...rest }: ShowProps) => (
  <ShowBase {...rest}>
    <ShowView title={title} actions={<ShowActionsWithPermissions />}>
      {children}
    </ShowView>
  </ShowBase>
);

export default Show;
