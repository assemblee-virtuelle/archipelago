import { useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useListContext, useCreatePath, RaRecord } from 'react-admin';
import { DatesSetArg, EventClickArg } from '@fullcalendar/core';

export type Props = {
  label: string;
  startDate: string;
  endDate: string;
  linkType: 'show' | 'edit';
};

const useFullCalendarProps = ({ label, startDate, endDate, linkType = 'edit' }: Props) => {
  interface EventRecord extends RaRecord {
    [label]: string;
    [startDate]: string;
    [endDate]: string;
  }

  const { data, isPending, isLoading, resource } = useListContext<EventRecord>();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const createPath = useCreatePath();

  // Bypass the link in order to use React-Router
  const eventClick = useCallback(
    ({ event, jsEvent }: EventClickArg) => {
      jsEvent.preventDefault();
      void navigate(event.url);
    },
    [navigate],
  );

  // Change the query string when month change
  const datesSet = useCallback(({ view }: DatesSetArg) => {
    setSearchParams((params) => ({
      ...params,
      month: view.currentStart.getMonth() + 1,
      year: view.currentStart.getFullYear(),
    }));
  }, [setSearchParams]);

  const events = useMemo(
    () =>
      (!isPending &&
        !isLoading &&
        data &&
        data
          .filter((record) => record)
          .map((record) => ({
            id: record.id.toString(),
            title: record[label],
            start: record[startDate],
            end: record[endDate],
            url: createPath({ resource, id: record.id, type: linkType }),
          }))) ||
      [],
    [isPending, isLoading, data, resource, createPath, label, startDate, endDate, linkType],
  );

  const query = new URLSearchParams(location.search);
  const queryYear = parseInt(query.get('year') || '', 10);
  const queryMonth = parseInt(query.get('month') || '', 10);
  const initialDate = queryYear && queryMonth ? new Date(queryYear, queryMonth - 1) : new Date();

  return {
    initialDate,
    events,
    datesSet,
    eventClick,
  };
};

export default useFullCalendarProps;
