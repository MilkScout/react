import { useMountedState } from './useMountedState';

export type RefFn<V> = (value: V | null) => void;

class MultiRef<K, V> {
  readonly map: Map<K, V> = new Map();

  private refFns: Map<K, RefFn<V>> = new Map();

  ref = (key: K): RefFn<V> => {
    let refFn = this.refFns.get(key);
    if (!refFn) {
      refFn = (value) => {
        if (value == null) {
          this.refFns.delete(key);
          this.map.delete(key);
        } else {
          this.map.set(key, value);
        }
      };
      this.refFns.set(key, refFn);
    }
    return refFn;
  };
}

export const useMultiRef = <KEY, VALUE>() => {
  const [multiRef] = useMountedState(new MultiRef<KEY, VALUE>());
  return [multiRef.ref, multiRef.map];
};
