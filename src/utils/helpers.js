/**
 * @name isEmpty
 * @description
 * Check if string, array or string is empty
 * @param {Object} obj Input to test for emptiness
 * @returns {Boolean} is empty or not
 */
export const isEmpty = (obj = {}) => {
  if (!obj) return true;
  return !Object.keys(obj).length > 0;
};

/**
 * @name capitilize
 * @description
 * Capitiliz string input
 * @param {String} input
 * @returns {String} Input with capitilized first letter
 */
export const capitilize = input =>
  input.charAt(0).toUpperCase() + input.slice(1);
