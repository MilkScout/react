export const optional = (validator: (value: any) => boolean) => (value: any) => {
  if (typeof value === 'undefined' || value === '' || value === null) {
    return true;
  }
  return validator(value);
};
