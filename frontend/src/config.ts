import { createTheme } from '@mui/material/styles';
import defaultTheme from './config/theme';
import resources from './resources';
import { Config } from './config/types';

const config: Config = {
  // Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash.
  middlewareUrl: import.meta.env.VITE_MIDDLEWARE_URL,

  // Mapbox Access Token used for addresses completion
  mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,

  // Application name
  title: 'Archipel',

  // Application theme. Should follow MaterialUI theme structure. Can inherit from default theme.
  theme: createTheme(defaultTheme, {}),

  // Resources displayed
  resources,
};

export default config;
