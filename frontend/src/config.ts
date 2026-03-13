import { LayoutOptions } from './layouts/LayoutContext';
import { Theme } from '@mui/material';

type MapboxOptions = {
  type: 'mapbox';
  accessToken: string;
};

type PhotonOptions = {
  type: 'photon';
  url: string;
  params: { key: string; value: string }[];
};

interface ConfigInterface {
  middlewareUrl: string;
  importableResources: string[];
  title: string;
  layout: LayoutOptions;
  theme?: (baseTheme: Theme) => Theme;
  HomePage?: JSX.Element;
  LoginPage?: JSX.Element;
  resources?: (baseResources: Record<string, object>) => Record<string, object>;
  geocoder: MapboxOptions | PhotonOptions;
}

const config: ConfigInterface = {
  // Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash.
  middlewareUrl: import.meta.env.VITE_MIDDLEWARE_URL,

  // Displays import tab when creating resource if it is listed here
  importableResources: ['Event', 'Project', 'Task', 'Group', 'Organization', 'Idea', 'Document', 'Skill'],

  geocoder: {
    type: 'mapbox',
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  },

  // geocoder: {
  //   type: 'photon',
  //   url: 'http://localhost:2322/api',
  //   params: [
  //     { key: 'lang', value: 'fr' },
  //     { key: 'lon', value: '-1.5541362' },
  //     { key: 'lat', value: '47.2186371' },
  //     { key: 'zoom', value: '10' },
  //     { key: 'location_bias_scale', value: '0' },
  //     { key: 'osm_tag', value: 'place' },
  //     { key: 'osm_tag', value: 'amenity' },
  //     { key: 'osm_tag', value: 'office' },
  //   ],
  // },

  // Application title
  title: 'Archipelago',

  // UI layout configuration
  layout: {
    name: 'leftMenu',
    options: {},
  },
};

export default config;
