import React, { ReactNode } from 'react';
import { getRandomId, when } from '../function';
import { NotProduction } from './NotProduction';
import { ViewContainer } from './ViewContainer';

export interface NotProductionValuesProps {
  nodes: Array<ReactNode> | Record<any, ReactNode>;
}

export const NotProductionValues = ({ nodes }: NotProductionValuesProps) => {
  const values: Array<ReactNode> = when(Array.isArray(nodes), nodes as Array<ReactNode>, Object.values(nodes));
  return (
    <NotProduction>
      <ViewContainer show={false}>
        {values.map((item) => (
          <div key={getRandomId()}>{item}</div>
        ))}
      </ViewContainer>
    </NotProduction>
  );
};
