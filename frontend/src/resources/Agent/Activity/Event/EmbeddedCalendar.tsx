import React from "react";
import { Box } from "@mui/material";
import frLocale from "@fullcalendar/core/locales/fr";
import { useSearchParams } from "react-router-dom";
import config from "../../../../config";
import type { RaRecord } from "react-admin";
import { useList, ListContextProvider } from "react-admin";
import CalendarList from "../../../../common/list/calendar/CalendarList";
import DaysList from "../../../../common/list/calendar/DaysList";

type EmbeddedEvent = RaRecord & {
    "@id"?: string;
    title?: string;
    "pair:hasTopic"?:
    | Array<string | { id?: string; "@id"?: string }>
    | string
    | { id?: string; "@id"?: string };
    "pair:involves"?:
    | Array<string | { id?: string; "@id"?: string }>
    | string
    | { id?: string; "@id"?: string };
    [key: string]: unknown;
};

type EmbeddedCalendarResponse = {
    events?: Array<Partial<EmbeddedEvent>>;
};

export default function EmbeddedCalendar() {
    const [searchParams] = useSearchParams();

    const [view, setView] = React.useState<"list" | "calendar">(() => {
        const viewParam = searchParams.get("view");
        return viewParam === "list" ? "list" : "calendar";
    });

    const [events, setEvents] = React.useState<EmbeddedEvent[]>([]);
    const [loading, setLoading] = React.useState(false);

    const listContext = useList<EmbeddedEvent>({
        data: events,
        isPending: loading,
    });

    React.useEffect(() => {
        const viewParam = searchParams.get("view");
        if (viewParam === "list" || viewParam === "calendar") {
            setView(viewParam);
        }
    }, [searchParams]);

    const appliedTheme = searchParams.get("theme") ?? "";
    const appliedOrg = searchParams.get("organization") ?? "";

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const url = new URL(`${config.middlewareUrl}api/embeddedcalendar/events`);
                if (appliedTheme) {
                    url.searchParams.set("theme", appliedTheme);
                }
                if (appliedOrg) {
                    url.searchParams.set("organization", appliedOrg);
                }
                const response = await fetch(
                    url.toString(),
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load events");
                }

                const raw: unknown = await response.json();
                const data = raw as EmbeddedCalendarResponse;

                const normalizedEvents: EmbeddedEvent[] = (data.events ?? []).map(
                    (event, index) => ({
                        ...event,
                        id: String(event.id ?? event["@id"] ?? index),
                    })
                );

                setEvents(normalizedEvents);
            } catch (error) {
                console.error("Failed to load events:", error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        void fetchEvents();
    }, [appliedTheme, appliedOrg]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <ListContextProvider value={{ ...listContext, resource: "Event" }}>
                {view === "list" ? (
                    <DaysList
                        locale={frLocale}
                        label="pair:label"
                        startDate="pair:startDate"
                        endDate="pair:endDate"
                        linkType="show"
                        openLinksInNewTab={true}
                    />
                ) : (
                    <CalendarList
                        locale={frLocale}
                        label="pair:label"
                        startDate="pair:startDate"
                        endDate="pair:endDate"
                        linkType="show"
                        openLinksInNewTab={true}
                    />
                )}
            </ListContextProvider>
        </Box>
    );
}