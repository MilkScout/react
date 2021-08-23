export const optional = (validator: (value: any) => boolean | Promise<boolean>) => (value: any) => {
  if (typeof value === 'undefined' || value === '' || value === null) {
    return true;
  }
  return validator(value);
};
