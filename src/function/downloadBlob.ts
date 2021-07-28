export const downloadBlob = (fileName: string, blob: Blob) => {
  // check if we run on an, internet explorer or edge
  if ((window as any).navigator && (window as any).navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    // all other browser support download attribute
    const a = document.createElement('a');
    a.setAttribute('style', 'display: none');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
};
