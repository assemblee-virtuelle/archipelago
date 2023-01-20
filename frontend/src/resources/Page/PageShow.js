import React from 'react';
import PageTitle from './PageTitle';
import { MarkdownField } from '../../common/field';
import { MainList } from '../../common/list';
import Show from "../../layout/show/Show";

const PageShow = props => (
  <Show title={<PageTitle />} {...props}>
    <MainList>
      <MarkdownField source="semapps:content" />
    </MainList>
  </Show>
);

export default PageShow;
