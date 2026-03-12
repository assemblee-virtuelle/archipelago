import React from "react";
import { Box, Stack, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import frLocale from "@fullcalendar/core/locales/fr";
import { Link, useSearchParams } from "react-router-dom";
import config from "../../../../config";
import type { RaRecord } from 'react-admin';

import { useList, ListContextProvider, ResourceContextProvider } from "react-admin";
import CalendarList from "../../../../common/list/calendar/CalendarList";
import DaysList from "../../../../common/list/calendar/DaysList";



type SelectOption = { value: string; label: string; };

type ThemeItem = { id?: string; '@id'?: string; "pair:label"?: string; };
type ThemesResponse = { "ldp:contains"?: ThemeItem[]; };


type EmbeddedEvent = RaRecord & {
    '@id'?: string;
    title?: string;
    'pair:hasTopic'?: Array<string | { id?: string; '@id'?: string }> | string | { id?: string; '@id'?: string };
    [key: string]: unknown;
};

type EmbeddedCalendarResponse = {
    theme?: string | null;
    themeUri?: string | null;
    events?: Array<Partial<EmbeddedEvent>>;
};



export default function EmbeddedCalendar() {
    const [searchParams] = useSearchParams();

    const [view, setView] = React.useState(() => {
        const viewParam = searchParams.get("view");
        return viewParam === "list" ? "list" : "calendar";
    });

    // Copy button state and handler
    const [copied, setCopied] = React.useState<"url" | "iframe" | null>(null);
    const copyToClipboard = async (text: string, what: "url" | "iframe") => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(what);
            window.setTimeout(() => setCopied(null), 1000);
        } catch (e) {
            window.prompt("Copie ce texte :", text);
        }
    };

    const debugMode = searchParams.get("debug") === "1";

    const getSlugFromUrl = (url: string) => {
        return url.split("/").filter(Boolean).pop() || "";
    };

    // Sync view with URL params
    React.useEffect(() => {
        const viewParam = searchParams.get("view");
        if (viewParam === "list" || viewParam === "calendar") {
            setView(viewParam);
        }

    }, [searchParams]);

    // Load themes in debug mode
    React.useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch(`${config.middlewareUrl}themes`, {
                    headers: {
                        Accept: "application/ld+json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to load themes");
                }
                const data: ThemesResponse = (await response.json()) as ThemesResponse;

                const themes: SelectOption[] = (data["ldp:contains"] ?? []).map((item: ThemeItem) => {
                    const itemUri = item.id ?? item['@id'] ?? "";

                    return {
                        value: getSlugFromUrl(itemUri),
                        label: item["pair:label"] ?? getSlugFromUrl(itemUri),
                    };
                });


                setThemeOptions(themes);
            } catch (error) {
                console.error("Failed to load themes :", error);
            }
        };

        if (debugMode) {
            void fetchThemes();
        }
    }, [debugMode]);

    const [draftTheme, setDraftTheme] = React.useState(() => searchParams.get("theme") ?? "");

    const [appliedTheme, setAppliedTheme] = React.useState(() => searchParams.get("theme") ?? "");

    const [themeOptions, setThemeOptions] = React.useState<SelectOption[]>([]);

    const [events, setEvents] = React.useState<EmbeddedEvent[]>([]);
    const [loading, setLoading] = React.useState(false);


    const listContext = useList<EmbeddedEvent>({ data: events, isPending: loading });

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);


                const url = new URL(`${config.middlewareUrl}api/embeddedcalendar/events`);

                if (appliedTheme) {
                    url.searchParams.set("theme", appliedTheme);
                }

                const response = await fetch(url.toString(), {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to load events");
                }

                const raw: unknown = await response.json();
                const data = raw as EmbeddedCalendarResponse;

                const normalizedEvents: EmbeddedEvent[] = (data.events ?? []).map((event, index) => ({
                    ...event,
                    id: String(event.id ?? event['@id'] ?? index)
                }));

                setEvents(normalizedEvents);
            } catch (error) {
                console.error("Failed to load events :", error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        void fetchEvents();
    }, [
        appliedTheme]);



    const params = new URLSearchParams();
    params.set("view", view);

    if (appliedTheme) params.set("theme", appliedTheme);

    const iframeUrl = `${window.location.origin}/embeddedcalendar?${params.toString()}`;
    const iframeCode = `<iframe src="${iframeUrl}" width="100%" height="600" style="border:0" title="Calendrier Transiscope"></iframe>`;

    const buildToolUrl = (nextView: "list" | "calendar") => {
        const params = new URLSearchParams();
        params.set("view", nextView);
        params.set("debug", "1");

        if (appliedTheme) params.set("theme", appliedTheme);
        return `/embeddedcalendar?${params.toString()}`;
    };

    return (
        <Box
            sx={{
                height: debugMode ? "100%" : "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Debug header */}
            {debugMode && (
                <Box sx={{ p: 2 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

                        {/* Display mode and iframe URL */}
                        <Paper sx={{ p: 2, flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                Affichage
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 1.5 }}>
                                <Button
                                    variant={view === "calendar" ? "contained" : "outlined"}
                                    component={Link}
                                    to={buildToolUrl("calendar")}
                                >
                                    Calendrier
                                </Button>

                                <Button
                                    variant={view === "list" ? "contained" : "outlined"}
                                    component={Link}
                                    to={buildToolUrl("list")}
                                >
                                    Liste
                                </Button>
                            </Stack>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                URL iframe (à copier)
                            </Typography>

                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: "action.hover",
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                    overflowX: "auto",
                                }}
                            >
                                {iframeUrl}
                            </Box>

                            {/* Copy button */}
                            <Button
                                size="small"
                                onClick={() => copyToClipboard(iframeUrl, "url")}
                                sx={{ alignSelf: "flex-start", mb: 1 }}
                            >
                                {copied === "url" ? "Copié !" : "Copier l’URL"}
                            </Button>
                        </Paper>

                        {/* Filters and iframe code */}
                        <Paper sx={{ p: 2, flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                iframe
                            </Typography>
                            {/* theme filters */}
                            <Stack spacing={2} sx={{ mb: 2 }}>

                                <FormControl size="small" fullWidth>
                                    <InputLabel id="theme-label">Thème</InputLabel>
                                    <Select
                                        labelId="theme-label"
                                        label="Thème"
                                        value={draftTheme}
                                        onChange={(e) => setDraftTheme(e.target.value)}
                                    >
                                        <MenuItem value="">Aucun</MenuItem>
                                        {themeOptions.map((theme) => (
                                            <MenuItem key={theme.value} value={theme.value}>
                                                {theme.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setAppliedTheme(draftTheme);
                                    }}
                                >
                                    OK
                                </Button>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Code iframe (à copier)
                            </Typography>

                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: "action.hover",
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-all",
                                }}
                            >
                                {iframeCode}
                            </Box>

                            {/* Copy button */}
                            <Button
                                size="small"
                                onClick={() => copyToClipboard(iframeCode, "iframe")}
                                sx={{ alignSelf: "flex-start", mb: 1 }}
                            >
                                {copied === "iframe" ? "Copié !" : "Copier l’iframe"}
                            </Button>

                        </Paper>

                    </Stack>
                </Box>
            )}

            <ResourceContextProvider value="Event">
                <ListContextProvider
                    value={{ ...listContext, resource: "Event" }}
                >
                    {view === "list" ? (
                        <DaysList
                            locale={frLocale}
                            label="pair:label"
                            startDate="pair:startDate"
                            endDate="pair:endDate"
                            linkType="show"
                            openLinksInNewTab={!debugMode}
                        />
                    ) : (
                        <CalendarList
                            locale={frLocale}
                            label="pair:label"
                            startDate="pair:startDate"
                            endDate="pair:endDate"
                            linkType="show"
                            openLinksInNewTab={!debugMode}
                        />
                    )}
                </ListContextProvider>
            </ResourceContextProvider>

        </Box>
    );
}