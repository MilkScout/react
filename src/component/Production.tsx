import React, { PropsWithChildren } from 'react';
import { when } from '../function';

export const Production = ({ children }: PropsWithChildren<unknown>) =>
  when(process.env.NODE_ENV === 'production', <>{children}</>, null);
