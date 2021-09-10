import { useCallback, useEffect } from 'react';
import { useMountedState } from './useMountedState';

const DEFAULT_ON_DEBOUNCE = () => {};

export const useDebounceFunction = (
  fun: () => void,
  milliseconds: number = 250,
  onBeforeDebounce: () => void = DEFAULT_ON_DEBOUNCE,
) => {
  const [run, setRun] = useMountedState<boolean>(false);
  const [, setDebounce] = useMountedState<any>(undefined);

  useEffect(() => {
    if (run) {
      fun();
      setRun(false);
    }
  }, [fun, run, setRun]);

  return useCallback(() => {
    onBeforeDebounce();
    setDebounce((current: any) => {
      window.clearTimeout(current);
      return window.setTimeout(() => setRun(true), milliseconds);
    });
  }, [onBeforeDebounce, setRun, milliseconds]);
};
