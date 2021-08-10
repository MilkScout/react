import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { when } from '../function';
import { STYLES } from '../variables';

export interface ViewContainerProps {
  show: boolean;
  wrapperEl?: ReactElement;
  hideStyle?: CSSProperties;
}

export const ViewContainer = ({
  show,
  children,
  hideStyle = STYLES.hide,
  wrapperEl = <div />,
}: PropsWithChildren<ViewContainerProps>) => {
  const style = when(show, {}, hideStyle);
  const wrapperStyle = wrapperEl?.props?.style || {};
  return React.cloneElement(wrapperEl, {
    children,
    style: { ...wrapperStyle, ...style },
  });
};
