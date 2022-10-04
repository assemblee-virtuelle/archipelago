import React from 'react';
import { TextField } from 'react-admin';
import { Grid } from '@material-ui/core';
import { AvatarWithLabelField, QuickAppendReferenceArrayField, ReferenceArrayField } from '@semapps/field-components';
import { ChipList, GridList} from '@semapps/list-components';
import GroupTitle from './GroupTitle';
import { MarkdownField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import Show from "../../../../layout/show/Show";

const GroupShow = props => (
  <Show title={<GroupTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:comment" />
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Person" source="pair:affiliates">
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
          <QuickAppendReferenceArrayField label="Projets" reference="Project" source="pair:involvedIn" filter={{ '@type': 'pair:Project' }}>
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField label="Evénements" reference="Event" source="pair:involvedIn" filter={{ '@type': 'pair:Event' }}>
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Document" source="pair:documentedBy">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default GroupShow;
