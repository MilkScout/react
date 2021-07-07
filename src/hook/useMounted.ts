import { RefObject, useLayoutEffect, useRef } from 'react';

export const useMounted = (): RefObject<boolean> => {
  const componentIsMounted = useRef(true);
  useLayoutEffect(
    () => () => {
      componentIsMounted.current = false;
    },
    [],
  );
  return componentIsMounted;
};
