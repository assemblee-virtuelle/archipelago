import React from 'react';
import { ReferenceFilter } from '@semapps/list-components';
import { useLayoutContext } from '../../layouts/LayoutContext';

const IdeaFilterSidebar = () => {
  const Layout = useLayoutContext();

  return (
    <Layout.Aside>
      <ReferenceFilter
        reference="Status"
        source="pair:hasStatus"
        limit={100}
        filter={{ a: 'pair:IdeaStatus' }}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
      <ReferenceFilter
        reference="Type"
        source="pair:hasType"
        limit={100}
        filter={{ a: 'pair:IdeaType' }}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
    </Layout.Aside>
  );
};

export default IdeaFilterSidebar;
