import React from 'react';
import { FilterLiveSearch, useTranslate } from 'react-admin';
import { useLayoutContext } from '../../../../layouts/LayoutContext';
import ReferenceFilterTree from '../../../../common/ReferenceFilterTree';

const EventFilterSidebar = () => {
  const Layout = useLayoutContext();
  const translate = useTranslate();

  return (
    <Layout.Aside>
      {Layout.name === 'topMenu' && (
        <FilterLiveSearch fullWidth source="pair:label" hiddenLabel label={translate('resources.Event.searchLabel')} />
      )}
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

export default EventFilterSidebar;
