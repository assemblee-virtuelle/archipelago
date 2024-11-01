import React from 'react';
import { ReferenceFilter } from '@semapps/list-components';
import { useLayoutContext } from '../../../../layouts/LayoutContext';

const PersonFilterSidebar = () => {
  const Layout = useLayoutContext();

  return (
    <Layout.Aside>
      <ReferenceFilter
        label="Intérêts"
        reference="Theme"
        source="pair:hasTopic"
        inverseSource="pair:topicOf"
        sort={{ field: 'pair:label', order: 'DESC' }}
        limit={100}
      />
    </Layout.Aside>
  );
};

export default PersonFilterSidebar;
