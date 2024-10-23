import React, { createContext, FunctionComponent, PropsWithChildren, ReactNode, useContext } from 'react';
import { LayoutProps } from 'react-admin';
import leftMenu, { LayoutOptions as LeftMenuOptions } from './leftMenu';
import topMenu, { LayoutOptions as TopMenuOptions } from './topMenu';

type BaseViewProps = PropsWithChildren<{
  title: string | ReactNode;
  actions: JSX.Element;
  aside?: JSX.Element;
}>;

export type LayoutComponents = {
  Layout: FunctionComponent<LayoutProps>;
  BaseView: FunctionComponent<BaseViewProps>;
};

export type LeftMenuLayoutType = LayoutComponents & LeftMenuOptions;
export type TopMenuLayoutType = LayoutComponents & TopMenuOptions;

type LayoutOptions = LeftMenuOptions | TopMenuOptions;
type LayoutContextType = LeftMenuLayoutType | TopMenuLayoutType;

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

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

export const useLayoutContext = <T extends LayoutOptions = LayoutOptions>() => {
  const layout = useContext(LayoutContext);

  // if (!layout) {
  //   throw new Error('You must use layout context inside LayoutContext provider');
  // }

  return layout as T & LayoutComponents;
};
