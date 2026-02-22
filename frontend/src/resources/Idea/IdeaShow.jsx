import React from 'react';
import { SingleFieldList, TextField } from 'react-admin';
import { Grid } from '@mui/material';
import { ReferenceArrayField, SeparatedListField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import { MarkdownField, AvatarWithLabelField } from '../../common/field';
import { Show } from '../../common/layout';
import { Hero, MainList, SideList } from '../../common/list';

const IdeaShow = props => (
  <Show {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField label="Courte description" source="pair:comment" />
          <ReferenceArrayField reference="Actor" source="pair:brainstormedBy">
            <SingleFieldList linkType="show">
              <TextField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Status" source="pair:hasStatus">
            <SeparatedListField link={false}>
              <TextField source="pair:label" />
            </SeparatedListField>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Type" source="pair:hasType">
            <SeparatedListField link={false}>
              <TextField source="pair:label" />
            </SeparatedListField>
          </ReferenceArrayField>
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Activity" source="pair:concretizedBy" sort={{ field: 'type', order: 'ASC' }}>
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default IdeaShow;
