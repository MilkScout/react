import React, { PropsWithChildren, ReactElement } from 'react';
import { when } from '../function';
import { NotProduction } from './NotProduction';
import { ViewContainer } from './ViewContainer';
import { VALIDATION_CONFIG } from '../variables';

export interface ViewProps {
  show: boolean | undefined;
  children: ReactElement;
}

export const View = ({ show, children }: PropsWithChildren<ViewProps>) =>
  when(
    !!show,
    <>{children}</>,
    // delete node on production build, for translation
    <>
      {VALIDATION_CONFIG.addToDom && (
        <NotProduction>
          <ViewContainer show={false}>{children}</ViewContainer>
        </NotProduction>
      )}
    </>,
  );
