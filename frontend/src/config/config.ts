import { LayoutOptions } from "../layouts/LayoutContext";

interface ConfigInterface {
  middlewareUrl: string;
  mapboxAccessToken: string;
  importableResources: string[];
  title: string;
  layout: LayoutOptions;
}

const config: ConfigInterface = {
  // Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash.
  middlewareUrl: import.meta.env.VITE_MIDDLEWARE_URL,

  // Mapbox Access Token used for addresses completion
  mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,

  // Displays import tab when creating resource if it is listed here
  importableResources: [
    "Event",
    "Project",
    "Task",
    "Group",
    "Organization",
    "Idea",
    "Document",
    "Skill",
  ],

  // Application title
  title: 'Archipelago',

  // UI layout configuration
  layout: {
    name: 'leftMenu',
    options: {},
  },
};

export default config;
