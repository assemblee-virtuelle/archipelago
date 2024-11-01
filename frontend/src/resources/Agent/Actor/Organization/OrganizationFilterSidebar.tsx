import React from 'react';
import { ReferenceFilter } from '@semapps/list-components';
import ReferenceFilterTree from '../../../../common/ReferenceFilterTree';
import { useLayoutContext } from '../../../../layouts/LayoutContext';

const OrganizationFilterSidebar = () => {
  const Layout = useLayoutContext();

  return (
    <Layout.Aside>
      <ReferenceFilter
        reference="Type"
        source="pair:hasType"
        inverseSource="pair:typeOf"
        limit={100}
        filter={{ a: 'pair:OrganizationType' }}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
      <ReferenceFilterTree
        reference="Theme"
        title="Thèmes"
        broader="pair:broader"
        source="pair:hasTopic"
        label="pair:label"
        filter={{}}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
    </Layout.Aside>
  );
};

export default OrganizationFilterSidebar;
