import React from 'react';
import { FilterLiveSearch, useTranslate } from 'react-admin';
import { useLayoutContext } from '../../../../layouts/LayoutContext';
import ReferenceFilter from '../../../../common/list/ReferenceFilter';

const PersonFilterSidebar = () => {
  const Layout = useLayoutContext();
  const translate = useTranslate();

  return (
    <Layout.Aside>
      {Layout.name === 'topMenu' && (
        <FilterLiveSearch fullWidth source="pair:label" hiddenLabel label={translate('resources.Person.searchLabel')} />
      )}
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
