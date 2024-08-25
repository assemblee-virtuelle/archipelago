import React, { PropsWithChildren } from 'react';
import { CreateActions, CreateBase, CreateProps } from 'react-admin';
import { CreateView } from '../index';

const Create = ({ title, actions, children, ...rest }: PropsWithChildren<CreateProps>) => (
  <CreateBase {...rest}>
    <CreateView actions={actions || <CreateActions />} title={title}>
      {children}
    </CreateView>
  </CreateBase>
);

export default Create;
