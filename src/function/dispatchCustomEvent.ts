export interface DispatchCustomEventOption {
  bubble: boolean;
  cancelAble: boolean;
  details: any;
}
export const DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION: DispatchCustomEventOption = {
  bubble: true,
  cancelAble: true,
  details: undefined,
};

export const dispatchCustomEvent = (
  eventName: string,
  options: DispatchCustomEventOption = DEFAULT_DISPATCH_CUSTOM_EVENT_OPTION,
) => {
  const customEvent = document.createEvent('CustomEvent');

  customEvent.initCustomEvent(eventName, options.bubble, options.cancelAble, options.details);
  window.document.dispatchEvent(customEvent);
};
