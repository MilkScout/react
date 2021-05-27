import { Dispatch, SetStateAction, useCallback } from 'react';
import { useMountedState } from './useMountedState';

export type HandleValues<T> = Partial<T> | ((prevState: T) => Partial<T>);

export interface UseFormStateResponse<T> {
  formState: T;
  setFormState: Dispatch<SetStateAction<T>>;
  handleValues: (values: HandleValues<T>) => void;
  resetFormState: () => void;
}

export const useFormState = <T>(initState: T): UseFormStateResponse<T> => {
  const [formState, setFormState] = useMountedState<T>(initState);

  const handleValues = useCallback(
    (dispatch: HandleValues<T>) => {
      setFormState((c) => {
        let values: Partial<T>;

        if (typeof dispatch === 'function') {
          values = dispatch(c);
        } else {
          values = dispatch;
        }

        const newState: any = { ...c };
        const objectKeys = Object.keys(values);
        for (let index = 0; index < objectKeys.length; index += 1) {
          const key = objectKeys[index];
          newState[key] = (values as any)[key];
        }
        return newState;
      });
    },
    [setFormState],
  );

  const reset = useCallback(() => {
    setFormState(initState);
  }, [setFormState, initState]);

  return {
    formState,
    setFormState,
    handleValues,
    resetFormState: reset,
  };
};
