import React from 'react';
import { ReferenceFilter } from '@semapps/list-components';
import { Aside } from '../../../../layout';

const PersonFilterSidebar = () => {
  return (
    <Aside>
      <ReferenceFilter
        label="Intérêts"
        reference="Theme"
        source="pair:hasTopic"
        inverseSource="pair:topicOf"
        sort={{ field: 'pair:label', order: 'DESC' }}
        limit={100}
      />
    </Aside>
  );
};

export default PersonFilterSidebar;
