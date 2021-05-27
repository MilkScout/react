import React, { PropsWithChildren } from 'react';

export interface ViewProps {
  show: boolean;
  remove?: boolean;
}

export const View = ({ show, remove = false, children }: PropsWithChildren<ViewProps>) => {
  if (show) {
    return <>{children}</>;
  }
  if (remove) {
    return undefined;
  }
  return <div style={{ display: 'none' }}>{children}</div>;
};
