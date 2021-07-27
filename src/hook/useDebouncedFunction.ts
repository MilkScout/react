import { useCallback, useEffect, useState } from 'react';

const DEFAULT_ON_DEBOUNCE = () => {};

export const useDebounceFunction = (
  fun: () => void,
  milliseconds: number = 250,
  onBeforeDebounce: () => void = DEFAULT_ON_DEBOUNCE,
) => {
  const [run, setRun] = useState<boolean>(false);
  const [, setDebounce] = useState<any>();

  useEffect(() => {
    if (run) {
      fun();
      setRun(false);
    }
  }, [fun, run, setRun]);

  const trigger = useCallback(() => {
    onBeforeDebounce();
    setDebounce((current: any) => {
      window.clearTimeout(current);
      return window.setTimeout(() => setRun(true), milliseconds);
    });
  }, [onBeforeDebounce, setRun, milliseconds]);

  return useCallback(() => {
    trigger();
  }, [trigger]);
};
