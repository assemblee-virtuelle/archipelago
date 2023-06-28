import React from 'react';
import Title from '../../layout/Title';
import { MarkdownField } from '../../common/field';
import { MainList } from '../../common/list';
import Show from "../../layout/show/Show";

const PageShow = props => (
  <Show title={<Title fieldName="semapps:title" />} {...props}>
    <MainList>
      <MarkdownField source="semapps:content" label={false} />
    </MainList>
  </Show>
);

export default PageShow;
