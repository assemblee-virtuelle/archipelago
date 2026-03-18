import React from 'react';
import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { useRecordContext } from 'react-admin';


const OrganizationIntegration = () => {

    const record = useRecordContext();

    const orgId = record?.id || record?.['@id'];
    const slug = orgId?.split('/').filter(Boolean).pop();

    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [view, setView] = React.useState('calendar');

    const params = new URLSearchParams();
    params.set('organization', slug);

    if (view === 'list') {
        params.set('view', 'list');
    }

    const iframeUrl = `${window.location.origin}/embeddedcalendar?${params.toString()}`;

    const [copied, setCopied] = React.useState(null);
    const handleCopy = async (text, type) => {
        await navigator.clipboard.writeText(text);
        setCopied(type);

        setTimeout(() => {
            setCopied(null);
        }, 1500);
    };

    const iframeCode = `<iframe src="${iframeUrl}" width="100%" height="600" style="border:0" title="Calendrier Transiscope"></iframe>`;

    return (
        <Box mb={4}>
            <Box sx={{
                color: 'grey',
                textAlign: 'right',
                borderBottom: '1px dashed #c0c0c0',
                paddingBottom: '10px',
                marginBottom: '10px',
            }}>
                Intégration
            </Box>

            <Typography variant="body2" sx={{ mb: 2 }}>
                Affichez les événements de cette organisation sur votre site.
            </Typography>

            <Box sx={{ mb: 1 }}>
                <Button variant="contained" color="secondary" size="small"
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    sx={{
                        mr: 1,
                        mb: 1,
                        borderRadius: '50px',
                        px: 2,
                        fontSize: '13px',
                        fontWeight: 400,
                        textTransform: 'none',
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

                        <Box>Aperçu ici</Box>
                    </Box>
                )}
            </Box>

            <Button variant="contained" color="secondary" size="small"
                onClick={() => handleCopy(iframeUrl, 'link')}
                endIcon={<ContentCopyIcon sx={{ fontSize: 16, opacity: 0.7 }} />}
                sx={{
                    mr: 1,
                    mb: 1,
                    borderRadius: '50px',
                    px: 2,
                    fontSize: '13px',
                    fontWeight: 400,
                    textTransform: 'none',
                }}
            >
                {copied === 'link' ? 'Copié !' : 'Copier le lien'}
            </Button>

            <Button variant="contained" color="secondary" size="small"
                onClick={() => handleCopy(iframeCode, 'code')}
                endIcon={<CodeIcon sx={{ fontSize: 16, opacity: 0.7 }} />}
                sx={{
                    mr: 0.5,
                    mb: 1,
                    borderRadius: '50px',
                    px: 2,
                    fontSize: '13px',
                    fontWeight: 400,
                    textTransform: 'none',
                }}
            >
                {copied === 'code' ? 'Copié !' : 'Copier le code'}
            </Button>

            <Tooltip title="Comment faire ?" componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: 'rgb(0, 82, 89)',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 400,
                    },
                },
            }}
            >
                <IconButton
                    component="a"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ mb: 1 }}
                >
                    <HelpOutlineIcon sx={{ fontSize: 22, color: 'rgb(0, 82, 89)' }} />
                </IconButton>
            </Tooltip>



            {/* <Typography variant="body2" sx={{ mt: 1 }}>
                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        mt: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,

                    }}
                >
                    Comment faire
                    <HelpOutlineIcon sx={{ fontSize: 16 }} />
                </Link>

            </Typography> */}
        </Box>
    );
};

export default OrganizationIntegration;