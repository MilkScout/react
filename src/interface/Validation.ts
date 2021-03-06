import { ReactNode } from 'react';

export type ExternalFormState = { [value: string]: any };

export type ValidationMessage<T, D> = ((value: D, state: T) => ReactNode) | ReactNode;
export type ValidationFn<T, D> = (value: D, state: T) => Promise<boolean> | boolean;
export type ValidationObject<T, D> = { message?: ValidationMessage<T, D>; validateFn: ValidationFn<T, D> };
export type ValidationArray<T, D> = Array<ValidationObject<T, D>>;
export type Validation<T> = ValidationChain<Required<T>, keyof Required<T>>;
export type ValidationChain<T extends { [key: string]: any }, K extends keyof T> = {
  [P in K]: ValidationArray<T, T[P]>;
};

export type ValidationError<K> = {
  [P in keyof K]: boolean;
};
export type ErrorMessage<K> = {
  [P in keyof K]: ReactNode;
};
