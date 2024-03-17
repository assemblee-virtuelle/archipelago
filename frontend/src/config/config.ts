const config = {
  // Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash.
  middlewareUrl: process.env.MIDDLEWARE_URL,

  // Mapbox Access Token used for addresses completion
  mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,

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
};

export default config;
