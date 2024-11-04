import React from 'react';
import { FilterLiveSearch, useTranslate } from 'react-admin';
import { ReferenceFilter } from '@semapps/list-components';
import { useLayoutContext } from '../../../../layouts/LayoutContext';

const EventFilterSidebar = () => {
  const Layout = useLayoutContext();
  const translate = useTranslate();

  return (
    <Layout.Aside>
      {Layout.name === 'topMenu' && (
        <FilterLiveSearch fullWidth source="q" hiddenLabel label={translate('resources.Event.searchLabel')} />
      )}
      <ReferenceFilter
        reference="Theme"
        source="pair:hasTopic"
        inverseSource="pair:topicOf"
        limit={100}
        sort={{ field: 'pair:label', order: 'DESC' }}
      />
    </Layout.Aside>
  );
};

export default EventFilterSidebar;
