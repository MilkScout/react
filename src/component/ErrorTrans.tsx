import React from 'react';
import { getRandomId } from '../function';
import { useEffectOnce, useMountedState } from '../hook';
import { Validation, ValidationMessage } from '../interface';
import { EVENT_DEREGISTER_ERROR, EVENT_REGISTER_ERROR, VALIDATION_CONFIG } from '../variables';

export interface ErrorTransMessageProps {
  message?: ValidationMessage<any, any>;
}

export const ErrorTransMessage = ({ message: validationMessage }: ErrorTransMessageProps) => {
  if (typeof validationMessage === 'function') {
    // set there empty values
    return <>{validationMessage('', {})}</>;
  }
  if (typeof validationMessage !== 'undefined') {
    return <>{validationMessage}</>;
  }
  return null;
};

export type ErrorEventRegister = CustomEvent<{ id: string; validator: Validation<unknown> }>;
export type ErrorEventDeregister = CustomEvent<{ id: string }>;
export const ErrorTrans = () => {
  const [errorMessages, setErrorMessages] = useMountedState<{ [key: string]: Validation<any> }>({});

  // eslint-disable-next-line consistent-return
  useEffectOnce(() => {
    if (VALIDATION_CONFIG.addToDom) {
      const mountComponentRegister = (event: ErrorEventRegister) => {
        const { id, validator } = event.detail;
        setErrorMessages((c) => ({ ...c, [id]: validator }));
      };
      const unMountComponentDeregister = (event: ErrorEventDeregister) => {
        const { id } = event.detail;
        setErrorMessages((current) => {
          const newState = { ...current };
          delete newState[id];
          return newState;
        });
      };

      window.addEventListener<any>(EVENT_REGISTER_ERROR, mountComponentRegister);
      window.addEventListener<any>(EVENT_DEREGISTER_ERROR, unMountComponentDeregister);
      return () => {
        window.removeEventListener<any>(EVENT_REGISTER_ERROR, mountComponentRegister);
        window.removeEventListener<any>(EVENT_DEREGISTER_ERROR, unMountComponentDeregister);
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
                chain.map((p) => <ErrorTransMessage key={`error-message-${getRandomId()}`} message={p.message} />),
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
