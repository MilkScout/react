import React, { PropsWithChildren } from 'react';
import { when } from '../function';
import { VALIDATION_CONFIG } from '../variables';
import { NotProductionValues } from './NotProductionValues';

export interface ViewProps {
  show: boolean | undefined;
}

export const View = ({ show, children }: PropsWithChildren<ViewProps>) =>
  when(
    !!show,
    <>{children}</>,
    // delete node on production build, for translation
    <>{VALIDATION_CONFIG.addToDom && <NotProductionValues nodes={[children]} />}</>,
  );
