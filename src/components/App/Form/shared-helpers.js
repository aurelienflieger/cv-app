export const generateUniqueKeys = (numberOfKeysRequested) => {
  const baseKey = 0;
  const keysCollection = Array(numberOfKeysRequested)
    .fill("")
    .map((__) => baseKey + 1);
  return keysCollection;
};
