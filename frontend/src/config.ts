import { createTheme, Theme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LayoutOptions } from './layouts/LayoutContext';
import AppBarTitle from './transiscopeNantes/AppBarTitle';
import Footer from './transiscopeNantes/Footer';
import HomePage from './transiscopeNantes/HomePage';

declare global {
  interface Window {
    VITE_MIDDLEWARE_URL: string;
    VITE_MAPBOX_ACCESS_TOKEN: string;
  }
}

// Extend MUI types for custom palette colors
declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
        white: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
        white?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        white: true;
    }
}

interface ResourceConfig {
    translations?: {
        fr?: {
            name?: string;
            searchLabel?: string;
        };
    };
    [key: string]: unknown;
}

interface ConfigInterface {
    middlewareUrl: string;
    mapboxAccessToken: string;
    importableResources: string[];
    title: string;
    layout: LayoutOptions;
    theme: (baseTheme: Theme) => Theme;
    HomePage: React.ComponentType;
    resources: (baseResources: Record<string, ResourceConfig>) => Record<string, ResourceConfig>;
}

const config: ConfigInterface = {
    // Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash.
    middlewareUrl: import.meta.env.VITE_MIDDLEWARE_URL,

    // Mapbox Access Token used for addresses completion
    mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,

    // Displays import tab when creating resource if it is listed here
    importableResources: ['Event', 'Project', 'Organization', 'Document', 'Skill'],

    // Application title
    title: 'Transiscope en Pays Nantais',

    // Custom HomePage component
    HomePage: HomePage,

    // Theme customization - Transiscope colors
    theme: (baseTheme: Theme) => createTheme(baseTheme, {
        palette: {
            primary: {
                main: '#005259',
                contrastText: '#fff'
            },
            secondary: {
                main: '#ff9902',
            },
            tertiary: {
                main: '#03ad78',
            },
            white: {
                main: '#fff'
            },
            background: {
                default: '#fff',
            }
        },
    }),

    // Resources customization - remove unused resources and rename Organization to Alternative
    resources: (baseResources: Record<string, ResourceConfig>) => {
        const customizedResources = { ...baseResources };

        // Remove unwanted resources for Transiscope Nantes
        delete customizedResources['Group'];
        delete customizedResources['Task'];
        delete customizedResources['Idea'];

        // Change "Organisation" to "Alternative" wording
        const orgResource = customizedResources['Organization'];
        if (orgResource?.translations?.fr) {
            orgResource.translations.fr.name = 'Alternative |||| Alternatives';
            orgResource.translations.fr.searchLabel = 'Rechercher une alternative';
        }

        return customizedResources;
    },

    // UI layout configuration - top menu with custom header and footer
    layout: {
        name: 'topMenu',
        options: {
            logo: {
                url: '/logo192.png',
                alt: 'Transiscope en Pays Nantais'
            },
            title: AppBarTitle,
            mainMenu: [
                {
                    resource: 'Organization',
                    label: 'La carte',
                    link: '/Organization?perPage=500&sort=pair%3Alabel&view=map&lat=47.2186353776589&lng=-1.5545654296875002&zoom=10',
                    icon: MapIcon
                },
                {
                    resource: 'Event',
                    label: "L'agenda",
                    link: '/Event',
                    icon: CalendarMonthIcon
                }
            ],
            footer: Footer
        },
    },
};

export default config;
