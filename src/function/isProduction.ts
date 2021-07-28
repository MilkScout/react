export const isProduction = (fun: () => void): void => {
  if (process.env.NODE_ENV === 'production') {
    fun();
  }
};
