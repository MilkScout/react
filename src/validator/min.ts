export const min =
  (minimum: number, exclusive: boolean = false) =>
  (value: number) => {
    if (typeof value === 'undefined') {
      return false;
    }

    if (exclusive) {
      return value > minimum;
    }

    return value >= minimum;
  };
