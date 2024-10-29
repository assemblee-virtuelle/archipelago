import React from 'react';
import { MultiViewsList } from '@semapps/list-components';
import { MapList } from '@semapps/geo-components';
import { Avatar } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import OrganizationFilterSidebar from './OrganizationFilterSidebar';
import SimpleList from "../../../../common/list/SimpleList";
import { List } from '../../../../common/layout';

const OrganizationList = props => (
  <MultiViewsList
    ListComponent={List}
    aside={<OrganizationFilterSidebar />}
    views={{
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:label', order: 'ASC' },
        perPage: 25,
        list: (
          <SimpleList
            primaryText={record => record['pair:label']}
            secondaryText={record => record['pair:comment']}
            leftAvatar={record => (
              <Avatar src={record['image']} width="100%">
                <HomeIcon />
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
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
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

export default OrganizationList;
