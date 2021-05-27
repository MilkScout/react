export const openUrlInNewTab = (url: string) => {
  const anchor = document.createElement('a');
  anchor.setAttribute('target', '_blank');
  anchor.setAttribute('href', url);
  anchor.click();
};
