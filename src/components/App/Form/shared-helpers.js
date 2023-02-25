export const generateUniqueKeys = (numberOfKeysRequested) => {
  const baseKey = 0;
  const keysCollection = Array(numberOfKeysRequested)
    .fill("")
    .map((__, index) => baseKey + index);
  return keysCollection;
};
