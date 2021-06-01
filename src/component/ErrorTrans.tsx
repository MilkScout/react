import React, { ReactNode } from 'react';
import { getRandomId } from '../function';

export interface ErrorTransProps {
  validator: { [validators: string]: Array<{ message: ReactNode }> };
}

export const ErrorTrans = ({ validator }: ErrorTransProps) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return (
    <span style={{ display: 'none' }}>
      {Object.values(validator).flatMap((chain) =>
        chain.map((p) => <div key={`error-message-${getRandomId()}`}>{p.message}</div>),
      )}
    </span>
  );
};
