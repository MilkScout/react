import { CSSProperties } from 'react';

export const EVENT_REGISTER_ERROR = 'milkscout-register-error-event';
export const EVENT_DEREGISTER_ERROR = 'milkscout-deregister-error-event';
export const STORAGE_TEST_KEY = '@MILKSCOUT_TEST_KEY';

export const VALIDATION_CONFIG = {
  addToDom: process.env.NODE_ENV !== 'production',
};

export const STYLES: { [name: string]: CSSProperties } = {
  hide: { display: 'none' },
};
