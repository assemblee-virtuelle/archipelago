import React from 'react';
import { SimpleList } from 'react-admin';
import { Avatar } from '@mui/material';
import { MultiViewsList } from '@semapps/list-components';
import { CalendarList } from '@semapps/date-components';
import frLocale from '@fullcalendar/core/locales/fr';
import ListIcon from '@mui/icons-material/List';
import EventIcon from '@mui/icons-material/Event';
import EventFilterSidebar from './EventFilterSidebar';
import { List } from '../../../../common/layout';

const EventList = props => (
  <MultiViewsList
    ListComponent={List}
    aside={<EventFilterSidebar />}
    views={{
      calendar: {
        label: 'Calendrier',
        icon: EventIcon,
        perPage: 1000,
        pagination: false,
        list: (
          <CalendarList
            locale={frLocale}
            label="pair:label"
            startDate="pair:startDate"
            endDate="pair:endDate"
            linkType="show"
          />
        )
      },
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:startDate', order: 'DESC' },
        perPage: 25,
        list: (
          <SimpleList
            primaryText={record => record['pair:label']}
            leftAvatar={record => (
              <Avatar src={record['image']} width="100%">
                <EventIcon />
              </Avatar>
            )}
            linkType="show"
          />
        )
      },
    }}
    {...props}
  />
);

export default EventList;
