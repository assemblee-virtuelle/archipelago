import React from 'react';
import { TextField, UrlField, DateField } from 'react-admin';
import { Grid } from '@material-ui/core';
import { Hero, MainList, SideList } from '@semapps/archipelago-layout';
import { AvatarWithLabelField, QuickAppendReferenceArrayField } from '@semapps/field-components';
import { GridList, ChipList } from '@semapps/list-components';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { ShowWithPermissions } from '@semapps/auth-provider';
import { MarkdownField } from '@semapps/markdown-components';
import EventTitle from './EventTitle';

const EventShow = props => (
  <ShowWithPermissions title={<EventTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero>
          <TextField source="pair:comment" />
          <DateField source="pair:startDate" showTime />
          <DateField source="pair:endDate" showTime />
          <UrlField source="pair:aboutPage" />
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Actor" source="pair:involves" sort={{ field: 'type', order: 'ASC' }}>
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </ShowWithPermissions>
);

export default EventShow;
