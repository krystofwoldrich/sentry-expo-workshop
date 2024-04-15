// Node.js detection
export const isNode = (): boolean => {
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
};
