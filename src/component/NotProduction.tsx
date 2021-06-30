import React, { PropsWithChildren } from 'react';

export const NotProduction = ({ children }: PropsWithChildren<{}>) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return <>{children}</>;
};
