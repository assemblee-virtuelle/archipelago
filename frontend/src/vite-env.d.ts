/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MIDDLEWARE_URL: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN: string;
  readonly VITE_PHOTON_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
