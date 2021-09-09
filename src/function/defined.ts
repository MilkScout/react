import { when } from './when';
import { required } from '../validator';

export const defined = <T>(value: T | undefined, defaultValue: T): T => when<T>(required(value), value!, defaultValue);
