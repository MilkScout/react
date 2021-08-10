export const formatNumber = (
  locale: string,
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
): string =>
  number.toLocaleString(locale.toLowerCase(), {
    minimumFractionDigits,
    maximumFractionDigits,
  });
