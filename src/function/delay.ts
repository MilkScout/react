export const delay = async <T>(funcOrPromise: (() => T) | Promise<T>, time: number = 500): Promise<T> => {
  const start = Date.now();
  let response: T;

  if (typeof funcOrPromise === 'function') {
    response = await funcOrPromise();
  } else {
    response = await funcOrPromise;
  }

  const end = Date.now();
  const diff = end - start;

  if (diff < time) {
    await new Promise((r) => setTimeout(r, time - diff));
  }
  return response;
};
