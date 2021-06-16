export const compareNumber = (firstNumber: number | undefined, secondNumber: number | undefined): 1 | -1 | 0 => {
  if (firstNumber === secondNumber) {
    return 0;
  }
  if (typeof firstNumber === 'undefined') {
    return -1;
  }
  if (typeof secondNumber === 'undefined') {
    return 1;
  }
  if (firstNumber > secondNumber) {
    return 1;
  }
  return -1;
};
