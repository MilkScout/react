import React, { CSSProperties, ReactElement } from 'react';
import { when } from '../function';
import { STYLES } from '../variables';

export interface HideProps {
  show: boolean | undefined;
  children: ReactElement;
  hideStyle?: CSSProperties;
}

export const Hide = ({ show, children, hideStyle = STYLES.hide }: HideProps) =>
  React.cloneElement(children, {
    style: { ...when(!!children?.props?.style, children?.props?.style, {}), ...when(!!show, {}, hideStyle) },
  });
