interface ImportMetaEnv {
    readonly VITE_MIDDLEWARE_URL: string;
    readonly VITE_FRONTEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}