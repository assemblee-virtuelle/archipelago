import React from 'react';
import { TextField, SimpleList, ArrayField } from 'react-admin';
import { Box, Grid } from '@material-ui/core';
import {
  MainList,
  SideList,
  Hero,
  SeparatedListField,
  RightLabel
} from '@semapps/archipelago-layout';
import { ShowWithPermissions } from '@semapps/auth-provider';
import { MapField } from '@semapps/geo-components';
import { ReferenceArrayField, ReferenceField, GroupedReferenceHandler } from '@semapps/semantic-data-provider';
import { QuickAppendReferenceArrayField, MultiUrlField, AvatarWithLabelField } from '@semapps/field-components';
import { ChipList, GridList } from '@semapps/list-components';
import { MarkdownField } from '@semapps/markdown-components';
import OrganizationTitle from './OrganizationTitle';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import { Avatar } from '@material-ui/core';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';

const ConditionalSourceDefinedHandler = ({ record, source, children, ...otherProps }) => {
  if (record?.[source] && (!Array.isArray(record[source]) || record[source].length > 0)) {
    return React.Children.map(children, (child, i) => {
      return React.cloneElement(child, { ...otherProps, record, source });
    });
  } else {
    return <></>;
  }
};

const domainMapping = {
  'forums.assemblee-virtuelle.org': {
    label: 'Forum',
    icon: <ForumIcon />,
    color: '#28ccfb',
    contrastText: 'white'
  },
  'peertube.virtual-assembly.org': {
    label: 'Peertube',
    icon: <VideocamOutlinedIcon />,
    color: 'white',
    contrastText: '#f2690d'
  },
  'chat.lescommuns.org': {
    label: 'Chat',
    icon: <Avatar src="/lescommuns.jpg" />,
    color: 'white',
    contrastText: 'black'
  }
}

const OrganizationShow = props => (
  <ShowWithPermissions title={<OrganizationTitle />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:comment" />
          <MultiUrlField source="pair:homePage" domainMapping={domainMapping} />
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
          <ReferenceArrayField reference="Document" source="pair:documentedBy">
            <SimpleList
              primaryText={record => record && record['pair:label']}
              leftIcon={() => <DescriptionIcon />}
              linkType="show"
            />
          </ReferenceArrayField>
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
          <GroupedReferenceHandler
            source="pair:organizationOfMembership"
            groupReference="MembershipRole"
            groupLabel="pair:label"
            filterProperty="pair:membershipRole"
            addLabel={false}
          >
            <ConditionalSourceDefinedHandler>
              <RightLabel mb={0} />
              <ArrayField source="pair:organizationOfMembership">
                <Box mb={4}>
                  <GridList xs={6} linkType={false} externalLinks>
                    <ReferenceField reference="Person" source="pair:membershipActor" link="show">
                      <AvatarWithLabelField label="pair:label" image="image" />
                    </ReferenceField>
                  </GridList>
                </Box>
              </ArrayField>
            </ConditionalSourceDefinedHandler>
          </GroupedReferenceHandler>
          <ReferenceArrayField reference="Organization" source="pair:partnerOf">
            <GridList xs={6} linkType="show" externalLinks>
              <AvatarWithLabelField label="pair:label" image="image">
                <HomeIcon />
              </AvatarWithLabelField>
            </GridList>
          </ReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Activity" source="pair:involvedIn">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
          <QuickAppendReferenceArrayField reference="Theme" source="pair:hasTopic">
            <ChipList primaryText="pair:label" linkType="show" externalLinks />
          </QuickAppendReferenceArrayField>
        </SideList>
      </Grid>
    </Grid>
  </ShowWithPermissions>
);

export default OrganizationShow;
