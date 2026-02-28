import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { GlobalStyles, useTheme } from '@mui/material';
import useFullCalendarProps, { Props as HookProps }  from './useFullCalendarProps';
import { LocaleInput } from '@fullcalendar/core';

type Props = HookProps & {
  locale: LocaleInput;
};

const CalendarList = (props: Props) => {
  const theme = useTheme();
  const fullCalendarProps = useFullCalendarProps(props);

  return (
    <>
      <GlobalStyles
        styles={theme => ({
          '.fc-button': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            border: 'none !important',
            opacity: '1 !important'
          },
          '.fc-day-today': {
            backgroundColor: `${theme.palette.secondary.light} !important`
          },
          // Overwrite violet color of links
          'a.fc-daygrid-dot-event': {
            color: 'black !important'
          }
        })}
      />

      <FullCalendar
        plugins={[dayGridPlugin]}
        locale={props.locale}
        initialView="dayGridMonth"
        eventBackgroundColor={theme.palette.primary.main}
        {...fullCalendarProps}
      />
    </>
  );
};

export default CalendarList;
