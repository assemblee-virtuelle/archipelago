import { ResourceDefinition } from 'react-admin';
import { LayoutOptions } from './layouts/LayoutContext';
import { Theme } from '@mui/material';
import { ResourceOptions } from './resources';

interface ResourceConfig {
  config: ResourceDefinition<ResourceOptions>;
  translations?: {
    [lang: string]: {
      [segment: string]: string
    };
  };
}

type MapboxOptions = {
  type: 'mapbox';
  accessToken: string;
};

type PhotonOptions = {
  type: 'photon';
  url: string;
  params?: { key: string; value: string }[];
};

interface ConfigInterface {
  middlewareUrl: string;
  title: string;
  layout: LayoutOptions;
  theme?: (baseTheme: Theme) => Theme;
  HomePage?: JSX.Element;
  LoginPage?: JSX.Element;
  resources?: (baseResources: Record<string, ResourceConfig>) => Record<string, ResourceConfig>;
  geocoder: MapboxOptions | PhotonOptions;
}

const config: ConfigInterface = {
  // Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash.
  middlewareUrl: import.meta.env.VITE_MIDDLEWARE_URL,

  geocoder: {
    type: 'mapbox',
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  },

  // Application title
  title: 'Archipelago',

  // UI layout configuration
  layout: {
    name: 'topMenu',
    options: {},
  },
};

export default config;
