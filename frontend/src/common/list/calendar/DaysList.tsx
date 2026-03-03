import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import useFullCalendarProps, { Props as HookProps } from './useFullCalendarProps';
import { GlobalStyles } from '@mui/material';
import { LocaleInput } from '@fullcalendar/core';

type Props = HookProps & {
  locale: LocaleInput;
};

const DaysList = (props: Props) => {
  const fullCalendarProps = useFullCalendarProps(props);

  return (
    <>
      <GlobalStyles
        styles={theme => ({
          '.fc-button': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            border: 'none !important',
            opacity: '1 !important'
          }
        })}
      />
      <FullCalendar
        plugins={[listPlugin]}
        locale={props.locale}
        initialView="listMonth"
        {...fullCalendarProps}
      />;
    </>
  );
};

export default DaysList;
