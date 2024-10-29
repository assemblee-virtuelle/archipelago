import React from 'react';
import { LayoutProps } from 'react-admin';
import { Layout } from '../../layout';

const BaseLayout = (props: LayoutProps) => {
  return <Layout  {...props} />;
};

export default BaseLayout;
