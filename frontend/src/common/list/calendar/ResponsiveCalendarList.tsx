import React from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import frLocale from '@fullcalendar/core/locales/fr';
import CalendarList from './CalendarList';
import DaysList from './DaysList';

const ResponsiveCalendarList = () => {
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return isLargeScreen ? (
    <CalendarList
      locale={frLocale}
      label="pair:label"
      startDate="pair:startDate"
      endDate="pair:endDate"
      linkType="show"
    />
  ) : (
    <DaysList locale={frLocale} label="pair:label" startDate="pair:startDate" endDate="pair:endDate" linkType="show" />
  );
};

export default ResponsiveCalendarList;
