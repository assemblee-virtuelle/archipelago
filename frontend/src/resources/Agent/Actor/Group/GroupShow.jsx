import React from 'react';
import { TextField } from 'react-admin';
import { Grid } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import { MarkdownField, AvatarWithLabelField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import { Show } from '../../../../common/layout';
import { ChipList, SmallChipList } from '../../../../common/list/ChipList/ChipList';
import CreatedField from '../../../../common/field/CreatedField';

const GroupShow = props => (
  <Show {...props}>
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
          <ReferenceArrayField label="Projets" reference="Project" source="pair:involvedIn" filter={{ 'type': 'pair:Project' }}>
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField label="Evénements" reference="Event" source="pair:involvedIn" filter={{ 'type': 'pair:Event' }}>
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SmallChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField reference="Document" source="pair:documentedBy">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
        </SideList>

        <CreatedField />
      </Grid>
    </Grid>
  </Show>
);

export default GroupShow;
