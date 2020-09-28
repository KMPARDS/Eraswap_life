export function renderEthersJsError(error) {
  return (
    (error &&
      error.error &&
      error.error.reason &&
      `Error from Smart Contract ${error.error.reason}`) ||
    (error &&
      error.error &&
      error.error.message &&
      `Error from Blockchain: ${error.error.message}`) ||
    (error && error.message && `Error on UI: ${error.message}`) ||
    `Weird error: ${typeof error === 'object' ? JSON.stringify(error) : error}`
  );
}
