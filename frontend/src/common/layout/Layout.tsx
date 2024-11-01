import React from 'react';
import { LayoutProps } from 'react-admin';
import { useLayoutContext } from '../../layouts/LayoutContext';

const BaseLayout = (props: LayoutProps) => {
  const { Layout } = useLayoutContext();
  return <Layout  {...props} />;
};

export default BaseLayout;
