import React from 'react';
import { TextField, SimpleList, EmailField, ArrayField } from 'react-admin';
import { Grid, Avatar, Box } from '@mui/material';
import { MapField } from '@semapps/geo-components';
import {
  ReferenceArrayField,
  QuickAppendReferenceArrayField,
  MultiUrlField,
  AvatarWithLabelField,
  SeparatedListField,
  ReferenceField
} from '@semapps/field-components';
import { ChipList, GridList } from '@semapps/list-components';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { MarkdownField } from '../../../../common/field';
import { Hero, MainList, SideList } from '../../../../common/list';
import Show from "../../../../layout/show/Show";
import RightLabel from '../../../../common/list/SideList/RightLabel';
import GroupedReferenceHandler from '../../../../common/GroupedReferenceHandler';

const ConditionalSourceDefinedHandler = ({ record, source, children, ...otherProps }) => {
  if (record?.[source] && (!Array.isArray(record[source]) || record[source].length > 0)) {
    return React.Children.map(children, (child) => {
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
  <Show {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <Hero image="image">
          <TextField source="pair:comment" />
          <MultiUrlField source="pair:homePage" domainMapping={domainMapping} />
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
            label={false}
          >
            <ConditionalSourceDefinedHandler>
              <RightLabel mb={0} />
              <ArrayField source="pair:organizationOfMembership">
                <Box mb={4}>
                  <GridList xs={6} linkType={false} externalLinks>
                    <ReferenceField reference="Person" source="pair:membershipActor" link="show" basePath="/Person">
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
  </Show>
);

export default OrganizationShow;
