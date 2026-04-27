import React from 'react';
import { TextField, UrlField, SimpleList } from 'react-admin';
import { Grid } from '@mui/material';
import { ReferenceArrayField, SeparatedListField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import DescriptionIcon from '@mui/icons-material/Description';
import { MarkdownField, AvatarWithLabelField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import { Show } from '../../../../common/layout';
import { ChipList, SmallChipList } from '../../../../common/list/ChipList/ChipList';
import CreatedField from '../../../../common/field/CreatedField';

const ProjectShow = props => (
  <Show {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField label="Courte description" source="pair:comment" />
          <UrlField label="Site web" source="pair:homePage" />
          <ReferenceArrayField reference="Status" source="pair:hasStatus">
            <SeparatedListField link={false}>
              <TextField source="pair:label" />
            </SeparatedListField>
          </ReferenceArrayField>
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
          <ReferenceArrayField reference="Document" source="pair:documentedBy">
            <SimpleList
              primaryText={record => record && record['pair:label']}
              leftIcon={() => <DescriptionIcon />}
              linkType="show"
            />
          </ReferenceArrayField>
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <ReferenceArrayField reference="Actor" source="pair:involves">
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image" />
            </GridList>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SmallChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField reference="Type" source="pair:hasType">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
          <ReferenceArrayField reference="Resource" source="pair:needs">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
        </SideList>

        <CreatedField />
      </Grid>
    </Grid>
  </Show>
);

export default ProjectShow;
