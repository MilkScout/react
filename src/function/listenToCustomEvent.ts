export const listenToCustomEvent = <T>(
  eventName: string,
  listener: (evt: CustomEvent<T>) => void,
  target: EventTarget = window.document,
) => {
  const eventListener = (evt: Event) => {
    listener(evt as CustomEvent<T>);
  };

  target.addEventListener(eventName, eventListener);
  return () => target.removeEventListener(eventName, eventListener);
};
