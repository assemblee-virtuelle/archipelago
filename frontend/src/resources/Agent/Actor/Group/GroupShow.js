import React from 'react';
import { TextField } from 'react-admin';
import { Column, ColumnShowLayout, Hero } from '@semapps/archipelago-layout';
import { AvatarWithLabelField, QuickAppendReferenceArrayField } from '@semapps/field-components';
import { ChipList, GridList} from '@semapps/list-components';
import { ShowWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';
import { MarkdownField } from '@semapps/markdown-components';
import GroupTitle from './GroupTitle';

const GroupShow = props => (
  <ShowWithPermissions title={<GroupTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:comment" />
        </Hero>
        <MarkdownField source="pair:description" />
        <br />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <ReferenceArrayField reference="Person" source="pair:affiliates">
          <GridList xs={6} linkType="show" externalLinks>
            <AvatarWithLabelField label="pair:label" image="image" />
          </GridList>
        </ReferenceArrayField>
        <QuickAppendReferenceArrayField label="Projets" reference="Project" source="pair:involvedIn" filter={{ '@type': 'pair:Project' }}>
          <ChipList primaryText="pair:label" linkType="show" externalLinks />
        </QuickAppendReferenceArrayField>
        <QuickAppendReferenceArrayField label="Evénements" reference="Event" source="pair:involvedIn" filter={{ '@type': 'pair:Event' }}>
          <ChipList primaryText="pair:label" linkType="show" externalLinks />
        </QuickAppendReferenceArrayField>
        <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
          <ChipList primaryText="pair:label" linkType="show" externalLinks />
        </QuickAppendReferenceArrayField>
        <QuickAppendReferenceArrayField reference="Document" source="pair:documentedBy">
          <ChipList primaryText="pair:label" linkType="show" externalLinks />
        </QuickAppendReferenceArrayField>
      </Column>
    </ColumnShowLayout>
  </ShowWithPermissions>
);

export default GroupShow;
