import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useMounted } from './useMounted';

export const useMountedState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(initialState);
  const isMounted = useMounted();
  const setter = useCallback(
    (value: SetStateAction<S>) => {
      if (isMounted.current) {
        setState(value);
      }
    },
    [setState, isMounted],
  );
  return [state, setter];
};
