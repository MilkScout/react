const parseDecimalNumber = (number: string): number | undefined => {
  const float = parseFloat(number);
  if (Number.isNaN(float)) {
    return undefined;
  }
  return float;
};

export { parseDecimalNumber as parseFloat };
