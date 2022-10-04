import React from 'react';
import { Avatar } from '@material-ui/core';
import { AvatarWithLabelField } from '@semapps/field-components';
import { MultiViewsList, GridList } from '@semapps/list-components';
import { MapList } from '@semapps/geo-components';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonFilterSidebar from './PersonFilterSidebar';
import SimpleList from "../../../../common/list/SimpleList";
import List from "../../../../layout/list/List";

const PersonList = props => (
  <MultiViewsList
    ListComponent={List}
    aside={<PersonFilterSidebar />}
    views={{
      avatar: {
        label: 'Trombinoscope',
        icon: AccountCircleIcon,
        sort: { field: 'pair:lastName', order: 'DESC' },
        perPage: 500,
        pagination: false,
        list: (
          <GridList xs={2} linkType="show" externalLinks>
            <AvatarWithLabelField label="pair:label" image="image" />
          </GridList>
        )
      },
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:lastName', order: 'DESC' },
        perPage: 25,
        list: (
          <SimpleList
            primaryText={record => record['pair:label']}
            secondaryText={record => record['pair:comment']}
            leftAvatar={record => (
              <Avatar src={record['image']} width="100%">
                <PersonIcon />
              </Avatar>
            )}
            linkType="show"
          />
        )
      },
      map: {
        label: 'Carte',
        icon: MapIcon,
        perPage: 500,
        pagination: false,
        list: (
          <MapList
            latitude={record => record?.['pair:hasLocation']?.['pair:latitude']}
            longitude={record => record?.['pair:hasLocation']?.['pair:longitude']}
            label={record => record['pair:label']}
            description={record => record['pair:comment']}
            scrollWheelZoom
          />
        )
      }
    }}
    {...props}
  />
);

export default PersonList;
