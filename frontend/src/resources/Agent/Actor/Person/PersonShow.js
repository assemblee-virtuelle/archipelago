import React from 'react';
import { TextField } from 'react-admin';
import { Grid } from '@material-ui/core';
import { MainList, SideList, Hero, GridList, AvatarField } from '@semapps/archipelago-layout';
import { QuickAppendReferenceArrayField } from '@semapps/field-components';
import { ChipList } from '@semapps/list-components';
import { ShowWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { MapField } from '@semapps/geo-components';
import PersonTitle from './PersonTitle';
import HomeIcon from '@material-ui/icons/Home';

const PersonShow = props => (
  <ShowWithPermissions title={<PersonTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:firstName" />
          <TextField source="pair:lastName" />
          <TextField source="pair:comment" />
        </Hero>
        <MainList>
          <MapField
            source="pair:hasLocation"
            address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
          />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Organization" source="pair:affiliatedBy">
            <GridList xs={6} linkType="show">
              <AvatarField label="pair:label" image="image">
                <HomeIcon />
              </AvatarField>
            </GridList>
          </ReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Activity" source="pair:involvedIn">
            <ChipList primaryText="pair:label" linkType="show" />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
            <ChipList primaryText="pair:label" linkType="show" />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Skill" source="pair:offers">
            <ChipList primaryText="pair:label" linkType="show" />
          </QuickAppendReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </ShowWithPermissions>
);

export default PersonShow;
