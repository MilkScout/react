import { useEffect, useState } from 'react';

export const useEffectOnce = (fun: () => void) => {
  const [initial, setInitial] = useState(true);
  useEffect(() => {
    if (initial) {
      setInitial(false);
      fun();
    }
  });
};
