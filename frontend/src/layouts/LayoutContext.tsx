import { createContext, FunctionComponent, PropsWithChildren, ReactNode, useContext } from 'react';
import { LayoutProps } from 'react-admin';
import { LayoutOptions as LeftMenuOptions } from './leftMenu';
import { LayoutOptions as TopMenuOptions } from './topMenu';

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
export type TopMenuLayoutType = LayoutComponents & TopMenuOptions;

export type LayoutOptions = LeftMenuOptions | TopMenuOptions;
type LayoutContextType = LeftMenuLayoutType | TopMenuLayoutType;

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = <T extends LayoutOptions = LayoutOptions>() => {
  const layout = useContext(LayoutContext);
  return layout as T & LayoutComponents;
};
