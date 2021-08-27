import React, { ReactNode } from 'react';
import { getRandomId } from 'src/function/getRandomId';
import { when } from 'src/function/when';
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
