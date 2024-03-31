import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  define: {
    'process.env.MIDDLEWARE_URL': `"${process.env.REACT_APP_MIDDLEWARE_URL}"`,
    'process.env.MAPBOX_ACCESS_TOKEN': `"${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}"`,
  },
});
