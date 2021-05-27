export type IdPropertyFunction<T> = (element: T) => string;
export type IdPropertyKey<T> = keyof T;

export const getIdentityMap = <T>(
  array: Array<T>,
  idProperty: IdPropertyKey<T> | IdPropertyFunction<T>,
): Record<string, T> => {
  const resultMap: Record<string, T> = {};
  array.forEach((element) => {
    if (typeof idProperty === 'function') {
      const propertyKey = idProperty(element);
      resultMap[propertyKey] = element;
    } else {
      resultMap[idProperty as string] = element;
    }
  });
  return resultMap;
};
