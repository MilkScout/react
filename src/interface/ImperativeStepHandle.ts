export interface ImperativeStepHandle<T> {
  validate: () => Promise<boolean>;
  getState: () => T;
  setValue: (value: Partial<T>) => void;
}
