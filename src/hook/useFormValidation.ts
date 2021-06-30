/* eslint-disable no-await-in-loop */
import { ReactNode, useCallback } from 'react';
import { useMountedState } from './useMountedState';
import { ErrorMessage, Validation, ValidationError } from '../interface';
import { getRandomId } from '../function';
import { useEffectOnce } from './useEffectOnce';
import { EVENT_REGISTER_ERROR, VALIDATION_CONFIG } from '../variables';

const getDefaultError = <T>(validator: Validation<T>, propertyNames: Array<string>): ValidationError<T> =>
  Object.keys(validator)
    .filter((propertyName) => propertyNames.indexOf(propertyName) > -1)
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: false,
      }),
      {},
    ) as ValidationError<T>;

const getDefaultErrorMessage = <T>(validator: Validation<T>, propertyNames: Array<string>): ErrorMessage<T> =>
  Object.keys(validator)
    .filter((propertyName) => propertyNames.indexOf(propertyName) > -1)
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: undefined,
      }),
      {},
    ) as ErrorMessage<T>;

export const useFormValidation = <T>(validator: Validation<T>) => {
  const [validationId] = useMountedState<string>(getRandomId());
  const [formState, setFormState] = useMountedState<{ [value: string]: any }>({} as any);
  const [errorState, setErrorState] = useMountedState<ValidationError<T>>(
    getDefaultError<T>(validator, Object.keys(validator)),
  );
  const [errorMessage, setErrorMessage] = useMountedState<ErrorMessage<T>>(
    getDefaultErrorMessage<T>(validator, Object.keys(validator)),
  );

  const validate = useCallback(
    async (key?: keyof T): Promise<boolean> => {
      const entries = Object.entries(validator).filter(([propertyName]) => {
        if (typeof key !== 'undefined') {
          if (key !== propertyName) {
            return false;
          }
        }
        return true;
      });
      const propertyNames = entries.map(([propertyName]) => propertyName);
      const errors: any = getDefaultError<T>(validator, propertyNames);
      const message: any = getDefaultErrorMessage<T>(validator, propertyNames);
      let valid = true;

      for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        const propertyName = entry[0];

        const messAndValFnArray = entry[1] as any;
        const propertyValue = (formState as any)[propertyName];

        let validationChainResult = true;
        for (let iIndex = 0; iIndex < messAndValFnArray.length; iIndex += 1) {
          const messAndValFn = messAndValFnArray[iIndex];
          // result of validation
          const validationResult: boolean = await messAndValFn.validateFn(propertyValue, formState);
          validationChainResult = validationChainResult && validationResult;

          if (!validationResult) {
            message[propertyName] = messAndValFn.message;
            break;
          }
        }
        // update result
        valid = valid && validationChainResult;
        errors[propertyName] = !validationChainResult;
      }

      setErrorMessage((current) => ({
        ...current,
        ...message,
      }));
      setErrorState((current) => ({
        ...current,
        ...errors,
      }));
      return valid;
    },
    [formState, setErrorState, setErrorMessage, validator],
  );

  const getState = useCallback((): T => {
    const result: any = {};
    const entries = Object.entries(validator);
    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      const propertyName = entry[0];
      result[propertyName] = (formState as any)[propertyName];
    }
    return result;
  }, [formState, validator]);

  const getErrorMessage = useCallback(
    (propertyName: keyof T, noError: ReactNode = undefined): ReactNode => {
      if (errorState[propertyName]) {
        return errorMessage[propertyName];
      }
      return noError;
    },
    [errorMessage, errorState],
  );

  const resetError = useCallback(() => {
    setErrorState(getDefaultError<T>(validator, Object.keys(validator)));
  }, [setErrorState, validator]);

  useEffectOnce(() => {
    if (VALIDATION_CONFIG.addToDom) {
      window.dispatchEvent(new CustomEvent(EVENT_REGISTER_ERROR, { detail: { id: validationId, validator } }));
    }
  });

  return {
    validate,
    errorState,
    errorMessage,
    setErrorFormState: setFormState,
    getErrorMessage,
    getState,
    resetError,
  };
};
