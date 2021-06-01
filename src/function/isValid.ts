export const isValid = async (...promises: Array<Promise<boolean> | boolean>): Promise<boolean> => {
  const promiseMap = await Promise.all(promises);
  return promiseMap.reduce((prev, curr) => prev && curr, true);
};
