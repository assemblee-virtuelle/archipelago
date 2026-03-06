import React from "react";
import { Box, Stack, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import frLocale from "@fullcalendar/core/locales/fr";
import { Link, useSearchParams } from "react-router-dom";

import { List } from "react-admin";
import CalendarList from "../../../../common/list/calendar/CalendarList";
import DaysList from "../../../../common/list/calendar/DaysList";

type SelectOption = { value: string; label: string; };
type ThemeItem = { id: string; "pair:label"?: string; };
type ThemesResponse = { "ldp:contains"?: ThemeItem[]; };
type OrganizationItem = { id: string; "pair:label"?: string; };
type OrganizationsResponse = { "ldp:contains"?: OrganizationItem[]; };


export default function EmbeddedCalendar(props: Record<string, unknown>) {
    const [searchParams] = useSearchParams();

    const [view, setView] = React.useState(() => {
        const v = searchParams.get("view");
        return v === "list" ? "list" : "calendar";
    });

    // BUTTON COPIE FONCTION
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

    const [embed] = React.useState(() => searchParams.get("embed") === "1");

    // FILTRES
    React.useEffect(() => {
        const v = searchParams.get("view");
        if (v === "list" || v === "calendar") {
            setView(v);
        }

    }, [searchParams]);

    React.useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch("http://localhost:3000/themes", {
                    headers: {
                        Accept: "application/ld+json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log("REPONSE ERREUR THEMES =", errorText);
                    throw new Error("Erreur lors du chargement des thèmes");
                }
                const data: ThemesResponse = (await response.json()) as ThemesResponse;

                const themes: SelectOption[] = (data["ldp:contains"] ?? []).map((item: ThemeItem) => ({
                    value: getSlugFromUrl(item.id),
                    label: item["pair:label"] ?? getSlugFromUrl(item.id),
                }));

                setThemeOptions(themes);
            } catch (error) {
                console.error("Erreur chargement thèmes :", error);
            }
        };
        void fetchThemes();
    }, []);

    React.useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await fetch("http://localhost:3000/organizations", {
                    headers: {
                        Accept: "application/ld+json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log("REPONSE ERREUR ORGANIZATIONS =", errorText);
                    throw new Error("Erreur lors du chargement des organisations");
                }
                const data: OrganizationsResponse = (await response.json()) as OrganizationsResponse;

                const organizations: SelectOption[] = (data["ldp:contains"] ?? []).map((item: OrganizationItem) => ({
                    value: getSlugFromUrl(item.id),
                    label: item["pair:label"] ?? getSlugFromUrl(item.id),
                }));

                setOrganizationOptions(organizations);
            } catch (error) {
                console.error("Erreur chargement organisations :", error);
            }
        };

        void fetchOrganizations();
    }, []);

    const [draftOrg, setDraftOrg] = React.useState("");
    const [draftTheme, setDraftTheme] = React.useState("");

    const [appliedOrg, setAppliedOrg] = React.useState("");
    const [appliedTheme, setAppliedTheme] = React.useState("");

    const [organizationOptions, setOrganizationOptions] = React.useState<SelectOption[]>([]);
    const [themeOptions, setThemeOptions] = React.useState<SelectOption[]>([]);

    const params = new URLSearchParams();
    params.set("view", view);
    params.set("embed", "1");

    if (appliedOrg) params.set("organization", appliedOrg);
    if (appliedTheme) params.set("theme", appliedTheme);

    const baseEmbedUrl = `/embeddedcalendar?${params.toString()}`;
    const iframeCode = `<iframe src="${baseEmbedUrl}" width="100%" height="600" style="border:0" title="Calendrier Transiscope"></iframe>`;

    const raFilter: Record<string, string> = {};
    if (appliedOrg) {
        raFilter["pair:involves"] = `http://localhost:3000/organizations/${appliedOrg}`;
    }
    if (appliedTheme) {
        raFilter["pair:hasTopic"] = `http://localhost:3000/themes/${appliedTheme}`;
    }


    const buildToolUrl = (nextView: "list" | "calendar") => {
        const p = new URLSearchParams();
        p.set("view", nextView);
        if (appliedOrg) p.set("organization", appliedOrg);
        if (appliedTheme) p.set("theme", appliedTheme);
        return `/embeddedcalendar?${p.toString()}`;
    };

    const getSlugFromUrl = (url: string) => {
        return url.split("/").filter(Boolean).pop() || "";
    };


    return (
        <Box
            sx={{
                height: embed ? "100vh" : "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* HEADER */}
            {!embed && (
                <Box sx={{ p: 2 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

                        {/* CASE 1 */}
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
                                {baseEmbedUrl}
                            </Box>

                            {/* BUTTON COPIE */}
                            <Button
                                size="small"
                                onClick={() => copyToClipboard(baseEmbedUrl, "url")}
                                sx={{ alignSelf: "flex-start", mb: 1 }}
                            >
                                {copied === "url" ? "Copié !" : "Copier l’URL"}
                            </Button>
                        </Paper>

                        {/* CASE 2 */}
                        <Paper sx={{ p: 2, flex: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Code iframe (à copier)
                            </Typography>

                            {/* SELECTS Organisation et thèmes */}
                            <Stack spacing={2} sx={{ mb: 2 }}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="org-label">Organisation</InputLabel>
                                    <Select
                                        labelId="org-label"
                                        label="Organisation"
                                        value={draftOrg}
                                        onChange={(e) => setDraftOrg(e.target.value)}
                                    >
                                        <MenuItem value="">Aucune</MenuItem>
                                        {organizationOptions.map((organization) => (
                                            <MenuItem key={organization.value} value={organization.value}>
                                                {organization.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

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
                                        setAppliedOrg(draftOrg);
                                        setAppliedTheme(draftTheme);
                                    }}
                                >
                                    OK
                                </Button>
                            </Stack>

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

                            {/* BUTTON COPIE */}
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

            <List
                {...props}
                resource="Event"
                perPage={1000}
                pagination={false}
                exporter={false}
                actions={false}
                filter={raFilter}
                sx={{ flex: 1 }}
            >
                {view === "list" ? (
                    <DaysList
                        locale={frLocale}
                        label="pair:label"
                        startDate="pair:startDate"
                        endDate="pair:endDate"
                        linkType="show"
                        openLinksInNewTab={embed}
                    />
                ) : (
                    <CalendarList
                        locale={frLocale}
                        label="pair:label"
                        startDate="pair:startDate"
                        endDate="pair:endDate"
                        linkType="show"
                        openLinksInNewTab={embed}

                    />
                )}
            </List>
        </Box>
    );
}