/* eslint-disable */
export const isValidChain = async (...promises: Array<Promise<boolean> | boolean>) => {
  let result = true;
  for (const promise of promises) {
    result = result && (await promise);
  }
  return result;
};
