export const printReactEnv = () => {
  // eslint-disable-next-line no-console
  console.groupCollapsed('React env');
  const variables = Object.entries(process.env)
    .filter(([key]) => key.startsWith('REACT_APP_'))
    .reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: value,
      }),
      {},
    );
  // eslint-disable-next-line no-console
  console.table(variables);
  // eslint-disable-next-line no-console
  console.groupEnd();
};
