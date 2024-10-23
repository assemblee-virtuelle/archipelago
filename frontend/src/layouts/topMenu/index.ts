import { lazy } from 'react';
import { LayoutComponents } from '../LayoutContext';

export type LayoutOptions = {
  name: 'topMenu';
  options: Partial<{
    sideBarPlacement: 'left' | 'right';
    logo: string;
    title: () => JSX.Element;
    mainMenu: {
      resource?: string;
      label: string;
      link?: string;
      icon?: () => JSX.Element;
    }[]
  }>;
};

export default {
  Layout: lazy(() => import('./Layout')),
  BaseView: lazy(() => import('./BaseView')),
} as LayoutComponents;
