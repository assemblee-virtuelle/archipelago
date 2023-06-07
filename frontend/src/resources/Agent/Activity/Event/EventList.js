import React from 'react';
import { MultiViewsList } from '@semapps/list-components';
import { CalendarList, DaysList } from '@semapps/date-components';
import frLocale from '@fullcalendar/core/locales/fr';
import ListIcon from '@mui/icons-material/List';
import EventIcon from '@mui/icons-material/Event';
import EventFilterSidebar from './EventFilterSidebar';
import List from "../../../../layout/list/List";

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
        perPage: 1000,
        pagination: false,
        list: (
          <DaysList
            locale={frLocale}
            label="pair:label"
            startDate="pair:startDate"
            endDate="pair:endDate"
            linkType="show"
          />
        )
      }
    }}
    {...props}
  />
);

export default EventList;
