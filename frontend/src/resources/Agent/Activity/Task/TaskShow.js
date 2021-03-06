import React from 'react';
import { SingleFieldList, TextField, DateField } from 'react-admin';
import { Grid } from '@material-ui/core';
import { Hero, MainList, SideList, SeparatedListField } from '@semapps/archipelago-layout';
import { AvatarWithLabelField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import { ShowWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { MarkdownField } from '@semapps/markdown-components';
import TaskTitle from './TaskTitle';

const TaskShow = props => (
  <ShowWithPermissions title={<TaskTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero>
          <DateField source="pair:dueDate" showTime />
          <DateField source="pair:endDate" showTime />
          <ReferenceArrayField reference="Project" source="pair:partOf">
            <SingleFieldList linkType="show">
              <TextField source="pair:label" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SingleFieldList linkType="show">
              <TextField source="pair:label" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Document" source="pair:uses">
            <SingleFieldList linkType="show">
              <TextField source="pair:label" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Status" source="pair:hasStatus">
            <SeparatedListField linkType={false}>
              <TextField source="pair:label" />
            </SeparatedListField>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Type" source="pair:hasType">
            <SeparatedListField linkType={false}>
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
          <ReferenceArrayField reference="Actor" source="pair:assignedTo" sort={{ field: 'type', order: 'ASC' }}>
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Actor" source="pair:hasFollower" sort={{ field: 'type', order: 'ASC' }}>
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Actor" source="pair:involves" sort={{ field: 'type', order: 'ASC' }}>
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </ShowWithPermissions>
);

export default TaskShow;
