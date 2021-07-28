import React, { CSSProperties, ReactElement } from 'react';

export interface HideProps {
  show: boolean;
  children: ReactElement;
}

const hideStyle: CSSProperties = { display: 'none' };
const showStyle: CSSProperties = {};

export const Hide = ({ show, children }: HideProps) =>
  React.cloneElement(children, { style: show ? showStyle : hideStyle });
