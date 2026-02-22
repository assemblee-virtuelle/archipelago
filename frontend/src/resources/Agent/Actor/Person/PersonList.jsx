import React from 'react';
import { Avatar } from '@mui/material';
import { MultiViewsList, GridList } from '@semapps/list-components';
import { MapList } from '@semapps/geo-components';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonFilterSidebar from './PersonFilterSidebar';
import SimpleList from "../../../../common/list/SimpleList";
import { List } from '../../../../common/layout';
import { AvatarWithLabelField } from '../../../../common/field';
import MobileMapPopupContent from '../../../../common/list/MobileMapPopupContent';

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
          <GridList xs={6} sm={2} linkType="show" externalLinks>
            <AvatarWithLabelField label="pair:label" image="image" />
            {/* <div>avatar</div> */}
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
            popupContent={MobileMapPopupContent}
          />
        )
      }
    }}
    {...props}
  />
);

export default PersonList;
