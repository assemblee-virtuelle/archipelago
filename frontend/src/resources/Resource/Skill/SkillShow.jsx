import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import { Show } from '../../../common/layout';
import { AvatarWithLabelField } from '../../../common/field';
import { SideList } from '../../../common/list';
import { ChipList } from '../../../common/list/ChipList/ChipList';

const SkillShow = props => (
  <Show {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Person" source="pair:offeredBy">
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Agent" source="pair:neededBy">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default SkillShow;
