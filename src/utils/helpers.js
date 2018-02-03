/**
 * Check if string, array or string is empty
 * @param {object} obj Input to test for emptiness
 */
export const isEmpty = (obj = {}) => !Object.keys(obj).length > 0;
