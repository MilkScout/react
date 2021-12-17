import { defined } from './defined';

export interface DispatchCustomEventOption<T> {
  target?: EventTarget;
  bubble?: boolean;
  canBeCancelled?: boolean;
  detail: T;
}

export const DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION: Required<DispatchCustomEventOption<any>> = {
  target: window.document,
  bubble: true,
  canBeCancelled: true,
  detail: undefined,
};

export const dispatchCustomEvent = <T>(
  eventName: string,
  options: DispatchCustomEventOption<T> = DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION,
) => {
  const customEvent = new CustomEvent(eventName, {
    bubbles: defined<boolean>(options.bubble, DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION.bubble),
    cancelable: defined<boolean>(options.canBeCancelled, DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION.canBeCancelled),
    detail: options.detail,
  });

  defined<EventTarget>(options.target, DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION.target).dispatchEvent(customEvent);
};
