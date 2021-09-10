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
    let mounted = true;
    if (run && mounted) {
      fun();
      setRun(false);
    }
    return () => {
      mounted = false;
    };
  }, [fun, run, setRun]);

  return useCallback(() => {
    onBeforeDebounce();
    setDebounce((current: any) => {
      window.clearTimeout(current);
      return window.setTimeout(() => setRun(true), milliseconds);
    });
  }, [onBeforeDebounce, setRun, milliseconds]);
};
