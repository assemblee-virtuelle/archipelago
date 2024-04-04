import React from 'react';
import { TextField } from 'react-admin';
import { Grid } from '@mui/material';
import { QuickAppendReferenceArrayField } from '@semapps/field-components';
import { ChipList } from '@semapps/list-components';
import { MapField } from '@semapps/geo-components';
import { Hero, MainList, SideList } from '../../../../common/list';
import Show from "../../../../layout/show/Show";
import MembershipAssociationField from '../../../../common/field/MembershipAssociationField';

const PersonShow = props => (
  <Show {...props}>
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
          <MembershipAssociationField
            source="pair:actorOfMembership"
            referenceFieldProps={{
              reference: "Organization",
              source: "pair:membershipOrganization",
              basePath: "/Organization",
              link: "show"
            }}
          />

          <QuickAppendReferenceArrayField reference="Activity" source="pair:involvedIn">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Skill" source="pair:offers">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default PersonShow;
