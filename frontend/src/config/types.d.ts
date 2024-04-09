/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResourceProps, StringMap } from 'react-admin';
import { Theme } from '@mui/material/styles';

declare module 'react-admin' {
  interface ResourceOptions {
    /** Parent resource name (used in default menu) */
    parent?: string;

    /** If false, hides import tab when creating resource */
    importable?: boolean;
  }
}

export type Config = {
  /** Middleware API url (ex: https://<host>:<port>/). Should contain a trailing slash. */
  middlewareUrl: string;

  /** Mapbox Access Token used for addresses completion */
  mapboxAccessToken: string;

  /** Application name */
  title: string;

  /** Application theme. Should follow MaterialUI theme structure. Can inherit from default theme. */
  theme: Theme;

  /** Resources displayed */
  resources: Record<string, {
    config: Omit<ResourceProps, 'name'>;
    dataModel: any; // TODO: Type this correctly by importing Semapps types
    translations?: StringMap;
  }>;

  /** Data servers */
  dataServers?: Record<string, any>; // TODO: Type this correctly by importing Semapps types

  /** Layout component override */
  Layout?: JSX.Element;

  /** Menu component override */
  Menu?: JSX.Element;

  /** AppBar component override */
  AppBar?: JSX.Element;

  /** HomePage component override */
  HomePage?: JSX.Element;

  /** LoginPage component override */
  LoginPage?: JSX.Element;
};
