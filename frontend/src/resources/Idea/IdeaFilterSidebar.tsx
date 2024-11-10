import React from 'react';
import { FilterLiveSearch, useTranslate } from 'react-admin';
import { ReferenceFilter } from '@semapps/list-components';
import { useLayoutContext } from '../../layouts/LayoutContext';

const IdeaFilterSidebar = () => {
  const Layout = useLayoutContext();
  const translate = useTranslate();

  return (
    <Layout.Aside>
      {Layout.name === 'topMenu' && (
        <FilterLiveSearch fullWidth source="q" hiddenLabel label={translate('resources.Idea.searchLabel')} />
      )}
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
