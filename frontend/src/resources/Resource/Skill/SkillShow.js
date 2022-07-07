import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SideList } from '@semapps/archipelago-layout';
import { AvatarWithLabelField, QuickAppendReferenceArrayField } from '@semapps/field-components';
import { GridList, ChipList } from '@semapps/list-components';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { ShowWithPermissions } from '@semapps/auth-provider';
import SkillTitle from './SkillTitle';

const SkillShow = props => (
  <ShowWithPermissions title={<SkillTitle />} {...props}>
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
          <QuickAppendReferenceArrayField reference="Agent" source="pair:neededBy">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </ShowWithPermissions>
);

export default SkillShow;
