import React from 'react';
import { getRandomId } from '../function';
import { useEffectOnce, useMountedState } from '../hook';
import { Validation } from '../interface';
import { EVENT_REGISTER_ERROR, VALIDATION_CONFIG } from '../variables';

export type ErrorEvent = CustomEvent<{ id: string; validator: Validation<unknown> }>;
export const ErrorTrans = () => {
  const [errorMessages, setErrorMessages] = useMountedState<{ [key: string]: Validation<any> }>({});

  // eslint-disable-next-line consistent-return
  useEffectOnce(() => {
    if (VALIDATION_CONFIG.addToDom) {
      const eventListener = (event: ErrorEvent) => {
        const { id, validator } = event.detail;
        setErrorMessages((c) => ({ ...c, [id]: validator }));
      };

      window.addEventListener<any>(EVENT_REGISTER_ERROR, eventListener);
      return () => {
        window.removeEventListener<any>(EVENT_REGISTER_ERROR, eventListener);
      };
    }
  });

  return (
    <>
      {VALIDATION_CONFIG.addToDom && (
        <div style={{ display: 'none' }}>
          {Object.entries(errorMessages).map(([id, validator]) => (
            <div key={id}>
              {Object.values(validator).flatMap((chain) =>
                chain.map((p) => <div key={`error-message-${getRandomId()}`}>{p.message}</div>),
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
