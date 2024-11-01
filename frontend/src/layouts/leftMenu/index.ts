import { lazy } from 'react';
import { LayoutComponents } from '../LayoutContext';

export type LayoutOptions = {
  name: 'leftMenu';
  options: Record<string, never>;
};

export default {
  Layout: lazy(() => import('./Layout')),
  BaseView: lazy(() => import('./BaseView')),
  Aside: lazy(() => import('./Aside')),
} as LayoutComponents;
