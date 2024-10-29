import React from 'react';
import { SingleFieldList, ChipField, ImageField } from 'react-admin';
import { Grid, Typography } from '@mui/material';
import { ReferenceArrayField } from '@semapps/field-components';
import { Show } from '../../../common/layout';
import { MarkdownField } from '../../../common/field';
import { MainList, SideList } from '../../../common/list';

const DocumentShow = props => (
  <Show {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Typography variant="h3" color="primary" component="h1" id="react-admin-title" />
        <MainList>
          <ImageField source="image" title="pair:label" label={false} sx={{
            '& img': {
              width: '100% !important',
              height: 'unset !important',
              maxWidth: '100% !important',
              maxHeight: '350px !important',
              objectFit: 'contain',
            }
           }} />
          <MarkdownField source="pair:description" label={false} />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Type" source="pair:hasType">
            <SingleFieldList linkType={false}>
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Agent" source="pair:documents">
            <SingleFieldList linkType="show">
              <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </Show>
);

export default DocumentShow;
