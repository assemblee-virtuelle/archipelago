import React from 'react';
import { TextField, SimpleList, EmailField, RaRecord } from 'react-admin';
import { Grid } from '@mui/material';
import { MapField } from '@semapps/geo-components';
import { ReferenceArrayField, MultiUrlField, SeparatedListField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import { MarkdownField, AvatarWithLabelField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import { Show } from '../../../../common/layout';
import MembershipAssociationField from '../../../../common/field/MembershipAssociationField';
import OrganizationIntegration from './OrganizationIntegration';
import { SmallChipList } from '../../../../common/list/ChipList/ChipList';
import AsyncSideList from '../../../../common/list/SideList/AsyncSideList';
import { PairOrganizationRecord } from '.';

const OrganizationShow = () => (
  <Show>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:comment" />
          <MultiUrlField source="pair:homePage" />
          <EmailField source="pair:e-mail" />
          <ReferenceArrayField reference="Status" source="pair:hasStatus">
            <SeparatedListField link={false}>
              <TextField source="pair:label" />
            </SeparatedListField>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Type" source="pair:hasType">
            <SeparatedListField link={false}>
              <TextField source="pair:label" />
            </SeparatedListField>
          </ReferenceArrayField>
          <ReferenceArrayField reference="Theme" source="pair:hasTopic">
            <SmallChipList primaryText="pair:label" linkType="show" externalLinks />
          </ReferenceArrayField>
        </Hero>
        <MainList>
          <MarkdownField source="pair:description" />
          <ReferenceArrayField reference="Document" source="pair:documentedBy">
            <SimpleList
              primaryText={(record: PairOrganizationRecord) => record && record['pair:label']}
              leftIcon={() => <DescriptionIcon />}
            />
          </ReferenceArrayField>
          <MapField
            source="pair:hasLocation"
            address={(record: PairOrganizationRecord) =>
              record['pair:hasLocation'] && record['pair:hasLocation']['pair:label']
            }
            latitude={(record: PairOrganizationRecord) =>
              record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']
            }
            longitude={(record: PairOrganizationRecord) =>
              record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']
            }
          />
        </MainList>
      </Grid>
      <Grid item xs={12} sm={3}>
        <SideList>
          <MembershipAssociationField
            source="pair:organizationOfMembership"
            referenceFieldProps={{
              reference: 'Person',
              source: 'pair:membershipActor',
              link: 'show',
            }}
          />

          <ReferenceArrayField reference="Organization" source="pair:partnerOf">
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image">
                <HomeIcon />
              </AvatarWithLabelField>
            </GridList>
          </ReferenceArrayField>
        </SideList>

        <ReferenceArrayField
          reference="Project"
          source="pair:involvedIn"
          filter={{ type: 'pair:Project' }}
          render={({ isPending, data }: { isPending: boolean; data: RaRecord[] }) => (
            <AsyncSideList
              data={data}
              isPending={isPending}
              source="pair:involvedIn"
              label="resources.Organization.show.involvedInProject"
            />
          )}
        />

        <ReferenceArrayField
          reference="Task"
          source="pair:involvedIn"
          filter={{ type: 'pair:Task' }}
          render={({ isPending, data }: { isPending: boolean; data: RaRecord[] }) => (
            <AsyncSideList
              data={data}
              isPending={isPending}
              source="pair:involvedIn"
              label="resources.Organization.show.involvedInTask"
            />
          )}
        />

        <ReferenceArrayField
          reference="Event"
          source="pair:involvedIn"
          filter={{ type: 'pair:Event' }}
          render={({ isPending, data }: { isPending: boolean; data: RaRecord[] }) => (
            <AsyncSideList
              data={data}
              isPending={isPending}
              source="pair:involvedIn"
              label="resources.Organization.show.involvedInEvent"
            />
          )}
        />

        <OrganizationIntegration />
      </Grid>
    </Grid>
  </Show>
);

export default OrganizationShow;
