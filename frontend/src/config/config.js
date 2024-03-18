const config = {
  middlewareUrl: process.env.REACT_APP_MIDDLEWARE_URL,
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,

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
