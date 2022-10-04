import React from 'react';
import { ShowBase } from 'react-admin';
import { ShowActions } from "@semapps/auth-provider";
import ShowView from "./ShowView";

const Show = ({ title, actions, children, ...rest }) => (
  <ShowBase {...rest}>
    <ShowView title={title} actions={actions}>
      {children}
    </ShowView>
  </ShowBase>
);

Show.defaultProps = {
  actions: <ShowActions />
};

export default Show;
