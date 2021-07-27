const parseNumber = (number: string | undefined): number | undefined => {
  if (typeof number === 'undefined') {
    return undefined;
  }
  const int = parseInt(number, 10);
  if (Number.isNaN(int)) {
    return undefined;
  }
  return int;
};

export { parseNumber as parseInt };
