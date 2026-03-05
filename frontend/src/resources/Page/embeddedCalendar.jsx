import React from "react";
import { Box, Stack } from "@mui/material";
import frLocale from "@fullcalendar/core/locales/fr";
import { Link, useSearchParams } from "react-router-dom";

import { List } from "react-admin";
import CalendarList from "../../common/list/calendar/CalendarList";
import DaysList from "../../common/list/calendar/DaysList";

export default function EmbeddedCalendar(props) {
    const [searchParams] = useSearchParams();

    // On initialise une seule fois au chargement
    const [view, setView] = React.useState(() => {
        const v = searchParams.get("view");
        return v === "list" ? "list" : "calendar";
    });

    const [embed] = React.useState(() => searchParams.get("embed") === "1");

    // Et ensuite : on met à jour seulement si le paramètre "view" existe et est valide
    React.useEffect(() => {
        const v = searchParams.get("view");
        if (v === "list" || v === "calendar") {
            setView(v);
        }
        // si v est null (ou autre), on NE FAIT RIEN -> on garde la vue actuelle
    }, [searchParams]);

    return (
        <Box
            sx={{
                height: embed ? "100vh" : "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {!embed && (
                <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                    <Link to="/embeddedcalendar?view=calendar">Calendrier</Link>
                    <Link to="/embeddedcalendar?view=list">Liste</Link>
                    <Link to="/embeddedcalendar?view=calendar&embed=1">Mode iframe</Link>
                </Stack>
            )}

            <List
                {...props}
                resource="Event"
                perPage={1000}
                pagination={false}
                exporter={false}
                actions={false}
                sx={{ flex: 1 }}
            >
                {view === "list" ? (
                    <DaysList
                        locale={frLocale}
                        label="pair:label"
                        startDate="pair:startDate"
                        endDate="pair:endDate"
                        linkType="show"
                    />
                ) : (
                    <CalendarList
                        locale={frLocale}
                        label="pair:label"
                        startDate="pair:startDate"
                        endDate="pair:endDate"
                        linkType="show"
                        height="100%"
                    />
                )}
            </List>
        </Box>
    );
}