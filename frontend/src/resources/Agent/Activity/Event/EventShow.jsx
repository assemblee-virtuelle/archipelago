import React from 'react';
import { TextField, UrlField, DateField, FunctionField, SingleFieldList } from 'react-admin';
import { Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { ReferenceArrayField } from '@semapps/field-components';
import { MapField } from '@semapps/geo-components';
import { MarkdownField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import { Show } from '../../../../common/layout';
import AddToCalendarButton from './AddToCalendarButton';
import AvatarChipField from '../../../../common/field/AvatarChipField';
import { SmallChipList } from '../../../../common/list/ChipList/ChipList';
import CreatedField from '../../../../common/field/CreatedField';

const EventShow = props => (
  <Show {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:comment" />
          <DateField source="pair:startDate" showTime />
          <DateField source="pair:endDate" showTime />
          <FunctionField
            source="pair:startDate"
            label=""
            render={(record) =>
              <AddToCalendarButton
                title={record['pair:label']}
                description={record['pair:comment']}
                location={record['pair:hasLocation']?.['pair:label']}
                startTime={record['pair:startDate']}
                endTime={record['pair:endDate']}
                id={record.id}
                url={window.location.href}
                showIcon
              />}
          />
          <UrlField source="pair:aboutPage" />
          <MapField
            source="pair:hasLocation"
            address={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']}
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
          />
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Actor" source="pair:involves" sort={{ field: 'type', order: 'ASC' }}>
            <SingleFieldList linkType={false}>
              <AvatarChipField label="pair:label" image="image" color="secondary" variant="filled">
                <HomeIcon />
              </AvatarChipField>
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SmallChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
        </SideList>

        <CreatedField />
      </Grid>
    </Grid>
  </Show>
);

export default EventShow;
