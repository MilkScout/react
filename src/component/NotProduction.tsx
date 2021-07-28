import React, { PropsWithChildren } from 'react';
import { when } from '../function';

export const NotProduction = ({ children }: PropsWithChildren<unknown>) =>
  when(process.env.NODE_ENV !== 'production', <>{children}</>, null);
