/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MIDDLEWARE_URL: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
