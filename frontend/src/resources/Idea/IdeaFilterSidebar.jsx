import React from 'react';
import { ReferenceFilter } from '@semapps/list-components';
import { Aside } from '../../layout';

const IdeaFilterSidebar = () => {
  return (
    <Aside>
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
    </Aside>
  );
};

export default IdeaFilterSidebar;
