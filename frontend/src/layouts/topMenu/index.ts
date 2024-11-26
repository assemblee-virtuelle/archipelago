import { lazy, ReactNode } from 'react';
import { SvgIconComponent } from "@mui/icons-material"
import { LayoutComponents } from '../LayoutContext';

export type LayoutOptions = {
  name: 'topMenu';
  options: Partial<{
    sideBarPlacement: 'left' | 'right';
    logo: string | { url: string; alt: string };
    title: boolean | (() => ReactNode);
    mainMenu: {
      resource?: string;
      label: string;
      mobileLabel?: string;
      link: string;
      icon: SvgIconComponent;
    }[];
    footer: () => ReactNode;
  }>;
};

export default {
  Layout: lazy(() => import('./Layout')),
  BaseView: lazy(() => import('./BaseView')),
  Aside: lazy(() => import('./Aside')),
} as LayoutComponents;
