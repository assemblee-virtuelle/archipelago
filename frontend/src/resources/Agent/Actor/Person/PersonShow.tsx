import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, useRecordContext } from 'react-admin';
import { Grid } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import { MapField } from '@semapps/geo-components';
import { MarkdownField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import { Show } from '../../../../common/layout';
import MembershipAssociationField from '../../../../common/field/MembershipAssociationField';
import { ChipList, SmallChipList } from '../../../../common/list/ChipList/ChipList';
import { PairPersonRecord } from '.';

const PersonSEO = () => {
  const record = useRecordContext<PairPersonRecord>();

  return record ? (
    <Helmet>
      <meta property="og:title" content={record['pair:label']} />
      {record['pair:comment'] && <meta property="og:description" content={record['pair:comment']} />}
      {record['pair:comment'] && <meta name="description" content={record['pair:comment']} />}
      {record['image'] && <meta property="og:image" content={record['image']} />}
    </Helmet>
  ) : null;
};

const PersonShow = () => (
  <Show>
    <PersonSEO />
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:firstName" />
          <TextField source="pair:lastName" />
          <TextField source="pair:comment" />
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
          <MapField
            source="pair:hasLocation"
            address={(record: PairPersonRecord) => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
            latitude={(record: PairPersonRecord) => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={(record: PairPersonRecord) => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
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
              link: "show"
            }}
          />

          <ReferenceArrayField reference="Activity" source="pair:involvedIn">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SmallChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField reference="Skill" source="pair:offers">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default PersonShow;
