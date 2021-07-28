export const when = <T>(condition: boolean, correct: T, incorrect: T): T => {
  if (condition) {
    return correct;
  }
  return incorrect;
};
