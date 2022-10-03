import React from 'react';
import { ChipField, SingleFieldList } from 'react-admin';
import { Grid } from '@material-ui/core';
import { ShowWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayField } from '@semapps/field-components';
import ThemeTitle from './ThemeTitle';
import { MarkdownField } from '../../../common/field';
import { MainList, SideList } from '../../../common/list';

const ThemeShow = props => (
  <ShowWithPermissions title={<ThemeTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <MainList>
          <MarkdownField source="pair:description" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Agent" source="pair:topicOf">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </ShowWithPermissions>
);

export default ThemeShow;
