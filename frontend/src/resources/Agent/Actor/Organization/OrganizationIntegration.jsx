import React from 'react';
import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRecordContext } from 'react-admin';
import RightLabel from '../../../../common/list/SideList/RightLabel';


const OrganizationIntegration = () => {

    const record = useRecordContext();
    const orgId = record?.id || record?.['@id'];
    const slug = orgId?.split('/').filter(Boolean).pop();

    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [view, setView] = React.useState('calendar');
    // const [view, setView] = React.useState('list');

    const [copied, setCopied] = React.useState(null);

    const [showHelp, setShowHelp] = React.useState(false);
    const [showAdvanced, setShowAdvanced] = React.useState(false);

    const params = new URLSearchParams();
    params.set('organization', slug);

    if (view === 'list') {
        params.set('view', 'list');
    }

    const iframeUrl = `${window.location.origin}/embeddedcalendar?${params.toString()}`;

    const handleCopy = async (text, type) => {
        await navigator.clipboard.writeText(text);
        setCopied(type);

        setTimeout(() => {
            setCopied(null);
        }, 1500);
    };

    const iframeCode = `<iframe src="${iframeUrl}" width="100%" height="600" style="border:0" title="Calendrier Transiscope"></iframe>`;

    const actionButtonSx = { borderRadius: '50px', px: 2, fontSize: '13px', fontWeight: 400, textTransform: 'none' };

    return (
        <Box mb={4}>
            <RightLabel label="Intégration" source="pair:involvedIn">
            </RightLabel>

            <Typography variant="body2" sx={{ mb: 2 }}>
                Affichez les événements de cette organisation sur votre site.
            </Typography>

            <Box sx={{ mb: 1 }}>
                <Button variant="contained" color="secondary" size="small"
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    sx={{
                        ...actionButtonSx,
                        mr: 1,
                        mb: 1,
                    }}
                >
                    {isPreviewOpen ? 'Masquer l’aperçu' : 'Aperçu'}
                </Button>
                {isPreviewOpen && (
                    <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Button
                                size="small"
                                variant={view === 'calendar' ? 'contained' : 'outlined'}
                                onClick={() => setView('calendar')}
                                sx={{ textTransform: 'none' }}
                            >
                                Calendrier
                            </Button>

                            <Button
                                size="small"
                                variant={view === 'list' ? 'contained' : 'outlined'}
                                onClick={() => setView('list')}
                                sx={{ textTransform: 'none' }}
                            >
                                Liste
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                border: '1px solid #eee',
                                borderRadius: 2,
                                overflow: 'hidden',
                                backgroundColor: '#fff'
                            }}
                        >
                            <iframe
                                src={iframeUrl}
                                width="100%"
                                height="500"
                                style={{ border: 0 }}
                                title="Aperçu du calendrier"
                            />
                        </Box>
                    </Box>
                )}
            </Box>

            <Button variant="contained" color="secondary" size="small"
                onClick={() => handleCopy(iframeUrl, 'link')}
                endIcon={<ContentCopyIcon sx={{ fontSize: 16, opacity: 0.7 }} />}
                sx={{
                    ...actionButtonSx,
                    mr: 1,
                    mb: 1,
                }}
            >
                {copied === 'link' ? 'Copié !' : 'Copier le lien'}
            </Button>

            <Button variant="contained" color="secondary" size="small"
                onClick={() => handleCopy(iframeCode, 'code')}
                endIcon={<CodeIcon sx={{ fontSize: 16, opacity: 0.7 }} />}
                sx={{
                    ...actionButtonSx,
                    mr: 0.5,
                    mb: 1,
                }}
            >
                {copied === 'code' ? 'Copié !' : 'Copier le code'}
            </Button>

            <Tooltip title="Comment faire ?">
                <IconButton
                    onClick={() => setShowHelp(!showHelp)}
                    size="small"
                    sx={{ mb: 1 }}
                >
                    <HelpOutlineIcon />
                </IconButton>
            </Tooltip>
            {showHelp && (
                <Box sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Comment faire ?
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Aperçu</strong> : permet de choisir l’affichage des événements (calendrier ou liste), puis de copier le lien ou le code correspondant.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Copier le lien</strong> : pour partager la vue des événements selon votre choix dans l’aperçu.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Copier le code</strong> : pour afficher les événements sur votre site selon votre choix dans l’aperçu.
                    </Typography>

                    <Typography variant="body2">
                        <strong>Astuce</strong> : collez le code dans un bloc HTML (iframe) si votre site en propose un.
                        Par défaut, le calendrier est sélectionné. Pour afficher en liste, choisissez ce mode dans l’aperçu avant de copier.
                    </Typography>

                    <Button
                        size="small"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        sx={{ textTransform: 'none', px: 0, minWidth: 'auto' }}
                    >
                        {showAdvanced ? 'Masquer les options avancées' : 'Options avancées'}
                    </Button>
                    {showAdvanced && (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Taille</strong> : vous pouvez ajuster <code>width</code> et <code>height</code> selon votre mise en page.
                            </Typography>

                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                <strong>Avancé</strong> : le code proposé est en HTML. Selon votre outil ou framework (React, Vue, Angular...), certaines écritures peuvent demander une légère adaptation, notamment pour les styles.
                            </Typography>
                        </Box>
                    )}

                </Box>
            )}
        </Box>
    );
};

export default OrganizationIntegration;
