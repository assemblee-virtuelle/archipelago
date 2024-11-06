import React, { createContext, FunctionComponent, PropsWithChildren, ReactNode, useContext } from 'react';
import { LayoutProps } from 'react-admin';
import leftMenu, { LayoutOptions as LeftMenuOptions } from './leftMenu';

type BaseViewProps = PropsWithChildren<{
  title: string | ReactNode;
  actions: JSX.Element;
  aside?: JSX.Element;
}>;

export type LayoutComponents = {
  Layout: FunctionComponent<LayoutProps>;
  BaseView: FunctionComponent<BaseViewProps>;
  Aside: FunctionComponent<PropsWithChildren>;
};

export type LeftMenuLayoutType = LayoutComponents & LeftMenuOptions;

type LayoutOptions = LeftMenuOptions;
type LayoutContextType = LeftMenuLayoutType;

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const layoutsComponents = {
  leftMenu,
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
  return layout as T & LayoutComponents;
};
