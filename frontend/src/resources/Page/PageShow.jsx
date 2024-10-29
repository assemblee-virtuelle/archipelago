import React from 'react';
import { MarkdownField } from '../../common/field';
import { MainList } from '../../common/list';
import { Show } from '../../common/layout';

const PageShow = props => (
  <Show {...props}>
    <MainList>
      <MarkdownField source="semapps:content" label={false} />
    </MainList>
  </Show>
);

export default PageShow;
