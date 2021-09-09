import React, { CSSProperties, ReactElement } from 'react';
import { when, defined } from '../function';
import { STYLES } from '../variables';

export interface HideProps {
  show: boolean | undefined;
  children: ReactElement;
  hideStyle?: CSSProperties;
}

export const Hide = ({ show, children, hideStyle = STYLES.hide }: HideProps) =>
  React.cloneElement(children, {
    style: { ...defined<CSSProperties>(children?.props?.style, {}), ...when(!!show, {}, hideStyle) },
  });
