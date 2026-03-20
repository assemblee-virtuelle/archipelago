import React from "react";
import { Box, Stack, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import config from "../src/config";


type SelectOption = { value: string; label: string; };

type ThemeItem = { id?: string; '@id'?: string; "pair:label"?: string; };
type ThemesResponse = { "ldp:contains"?: ThemeItem[]; };

type OrgItem = { id?: string; '@id'?: string; "pair:label"?: string; };
type OrgsResponse = { "ldp:contains"?: OrgItem[]; };


export default function DemoEmbeddedCalendar() {
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

    React.useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch(`${config.middlewareUrl}themes`, {
                    headers: { Accept: "application/ld+json" },
                });

                if (!response.ok) {
                    throw new Error("Failed to load themes");
                }

                const data: ThemesResponse = (await response.json()) as ThemesResponse;

                const themes: SelectOption[] = (data["ldp:contains"] ?? []).map((item: ThemeItem) => {
                    const itemUri = item.id ?? item["@id"] ?? "";
                    return {
                        value: getSlugFromUrl(itemUri),
                        label: item["pair:label"] ?? getSlugFromUrl(itemUri),
                    };
                });

                setThemeOptions(themes);
            } catch (error) {
                console.error("Failed to load themes:", error);
            }
        };

        const fetchOrganizations = async () => {
            try {
                const response = await fetch(`${config.middlewareUrl}organizations`, {
                    headers: { Accept: "application/ld+json" },
                });

                if (!response.ok) {
                    throw new Error("Failed to load organizations");
                }

                const data: OrgsResponse = (await response.json()) as OrgsResponse;

                const orgs: SelectOption[] = (data["ldp:contains"] ?? []).map((item: OrgItem) => {
                    const itemUri = item.id ?? item["@id"] ?? "";
                    return {
                        value: getSlugFromUrl(itemUri),
                        label: item["pair:label"] ?? getSlugFromUrl(itemUri),
                    };
                });

                setOrgOptions(orgs);
            } catch (error) {
                console.error("Failed to load organizations:", error);
            }
        };

        void fetchThemes();
        void fetchOrganizations();
    }, []);


    const [draftTheme, setDraftTheme] = React.useState(() => searchParams.get("theme") ?? "");
    const [draftOrg, setDraftOrg] = React.useState(() => searchParams.get("organization") ?? "");

    const [appliedTheme, setAppliedTheme] = React.useState(() => searchParams.get("theme") ?? "");
    const [appliedOrg, setAppliedOrg] = React.useState(() => searchParams.get("organization") ?? "");

    const [themeOptions, setThemeOptions] = React.useState<SelectOption[]>([]);
    const [orgOptions, setOrgOptions] = React.useState<SelectOption[]>([]);


    const params = new URLSearchParams();
    params.set("view", view);

    if (appliedTheme) params.set("theme", appliedTheme);
    if (appliedOrg) params.set("organization", appliedOrg);

    const iframeUrl = `${window.location.origin}/embeddedcalendar?${params.toString()}`;
    const iframeCode = `<iframe src="${iframeUrl}" width="100%" height="600" style="border:0" title="Calendrier Transiscope"></iframe>`;

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
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
                                onClick={() => setView("calendar")}
                            >
                                Calendrier
                            </Button>

                            <Button
                                variant={view === "list" ? "contained" : "outlined"}
                                onClick={() => setView("list")}
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

                            <FormControl size="small" fullWidth>
                                <InputLabel id="org-label">Organisation</InputLabel>
                                <Select
                                    labelId="org-label"
                                    label="Organisation"
                                    value={draftOrg}
                                    onChange={(e) => setDraftOrg(e.target.value)}
                                >
                                    <MenuItem value="">Aucun</MenuItem>
                                    {orgOptions.map((org) => (
                                        <MenuItem key={org.value} value={org.value}>
                                            {org.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                onClick={() => {
                                    setAppliedTheme(draftTheme);
                                    setAppliedOrg(draftOrg);
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

            <Box sx={{ flex: 1 }}>
                <iframe
                    src={iframeUrl}
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    title="Calendrier Transiscope"
                />
            </Box>
        </Box>
    );
}