import React, { PropsWithChildren } from 'react';
import { LayoutContext, LayoutOptions } from './LayoutContext';

import leftMenu from './leftMenu';
import topMenu from './topMenu';

const layoutsComponents = {
  leftMenu,
  topMenu,
};

type LayoutProviderProps = PropsWithChildren<{
  layoutOptions: LayoutOptions;
}>;

export const LayoutProvider = ({ children, layoutOptions }: LayoutProviderProps) => {
  const layoutComponents = layoutsComponents[layoutOptions.name];

  if (!layoutComponents) {
    return null;
  }

  return <LayoutContext.Provider value={{ ...layoutOptions, ...layoutComponents }}>{children}</LayoutContext.Provider>;
};
