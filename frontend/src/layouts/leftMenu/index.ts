import { lazy } from 'react';
import { LayoutComponents } from '../LayoutContext';

export type LayoutOptions = {
  name: 'leftMenu';
  options: never;
};

export default {
  Layout: lazy(() => import('./Layout')),
  BaseView: lazy(() => import('./BaseView')),
} as LayoutComponents;
