import { useCallback, useEffect, useState } from 'react';

const DEFAULT_ON_DEBOUNCE = () => {};

export const useDebounceFunction = (
  fun: () => void,
  milliseconds: number = 250,
  onBeforeDebounce: () => void = DEFAULT_ON_DEBOUNCE,
) => {
  const [, setDebounce] = useState<any>();
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (state) {
      onBeforeDebounce();
      setDebounce((current: any) => {
        window.clearTimeout(current);
        return window.setTimeout(() => {
          if (mounted) {
            fun();
            setState(false);
          }
        }, milliseconds);
      });
    }
    return () => {
      mounted = false;
    };
  }, [state, milliseconds, onBeforeDebounce, fun]);

  return useCallback(() => {
    setState(true);
  }, [setState]);
};
