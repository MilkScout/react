import { ReactNode } from 'react';

export const joinNode =
  (node: ReactNode) =>
  (array: ReactNode): ReactNode => {
    if (Array.isArray(array)) {
      const result = [];
      for (let i = 0; i < array.length; i += 1) {
        if (i !== 0) {
          result.push(node);
        }
        result.push(array[i]);
      }
      return result;
    }
    return array;
  };
