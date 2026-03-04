import React from "react";
import { MultiViewsList } from "@semapps/list-components";
import CalendarList from "../../common/list/calendar/CalendarList";
import DaysList from "../../common/list/calendar/DaysList";
import frLocale from "@fullcalendar/core/locales/fr";
import ListIcon from "@mui/icons-material/List";
import EventIcon from "@mui/icons-material/Event";

export default function EmbeddedCalendar(props) {
    return (
        <MultiViewsList
            {...props}
            resource="Event"
            views={{
                calendar: {
                    label: "Calendrier",
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
                    ),
                },
                list: {
                    label: "Liste",
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
                    ),
                },
            }}
        />
    );
}