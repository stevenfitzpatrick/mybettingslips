/**
 * Localstorage helpers
 */

/**
 * Set Local Storage value
 * @param {string} key
 * @param {string} value
 */
export function setItem(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Fetch Local Storage value
 * @param {string} key
 */
export function fetchItem(key) {
  return localStorage.getItem(key);
}

/**
 * Remove Local Storage value
 * @param {string} key
 */
export function removeItem(key) {
  localStorage.removeItem(key);
}
