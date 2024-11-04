import React from 'react';
import { FilterLiveSearch, useTranslate } from 'react-admin';
import { ReferenceFilter } from '@semapps/list-components';
import { useLayoutContext } from '../../../../layouts/LayoutContext';

const PersonFilterSidebar = () => {
  const Layout = useLayoutContext();
  const translate = useTranslate();

  return (
    <Layout.Aside>
      {Layout.name === 'topMenu' && (
        <FilterLiveSearch fullWidth source="q" hiddenLabel label={translate('resources.Person.searchLabel')} />
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
