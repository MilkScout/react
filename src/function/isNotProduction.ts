export const isNotProduction = (fun: () => void): void => {
  if (process.env.NODE_ENV !== 'production') {
    fun();
  }
};
