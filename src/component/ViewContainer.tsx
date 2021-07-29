import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { when } from '../function';

export interface ViewContainerProps {
  show: boolean;
  wrapperEl?: ReactElement;
  hideStyle?: CSSProperties;
}

const HIDE_STYLE: CSSProperties = { display: 'none' };

export const ViewContainer = ({
  show,
  children,
  hideStyle = HIDE_STYLE,
  wrapperEl = <div />,
}: PropsWithChildren<ViewContainerProps>) => {
  const style = when(show, {}, hideStyle);
  const wrapperStyle = (wrapperEl as any).style || {};
  return React.cloneElement(wrapperEl, {
    children,
    style: { ...wrapperStyle, ...style },
  });
};
