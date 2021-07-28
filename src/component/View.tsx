import React, { PropsWithChildren, ReactElement } from 'react';
import { when } from '../function';

export interface ViewProps {
  show: boolean;
  children: ReactElement;
}

export const View = ({ show, children }: PropsWithChildren<ViewProps>) => when(show, <>{children}</>, null);
