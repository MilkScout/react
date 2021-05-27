import { RefObject, useEffect, useRef } from 'react';

export const useMounted = (): RefObject<boolean> => {
  const componentIsMounted = useRef(true);
  useEffect(
    () => () => {
      componentIsMounted.current = false;
    },
    [],
  );
  return componentIsMounted;
};
