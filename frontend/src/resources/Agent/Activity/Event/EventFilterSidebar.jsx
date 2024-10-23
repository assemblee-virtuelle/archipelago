import React from 'react';
import { ReferenceFilter } from '@semapps/list-components';
import { Aside } from '../../../../layout';

const EventFilterSidebar = () => {
  return (
    <Aside>
      <ReferenceFilter
        reference="Theme"
        source="pair:hasTopic"
        inverseSource="pair:topicOf"
        limit={100}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
    </Aside>
  );
};

export default EventFilterSidebar;
