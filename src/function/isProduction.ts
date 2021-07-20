export const isProduction = (fun: Function): void => {
  if (process.env.NODE_ENV === 'production') {
    fun();
  }
};
