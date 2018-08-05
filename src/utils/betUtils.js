var Fraction = require('fractional').Fraction;

/**
 * Convert fraction to decimal number
 * @param {number} numerator
 * @param {number} denominator
 * @returns {float}
 */
export const fractionToDecimal = (numerator = 1, denominator = 1) => {
  return numerator / denominator + 1;
};

/**
 * Convert decimal to fraction looking odds
 * @param {float} decimal
 * @returns {string} fraction odds
 */
export const decimalToFraction = decimal => {
  const { numerator, denominator } = new Fraction(decimal - 1);
  return `${numerator}/${denominator}`;
};

/**
 * Calculate possible winning odds
 * @param {float} odds
 * @param {float} stake
 * @returns {float} winnings
 */
export const calculateWinnings = (odds, stake) => {
  return Math.ceil(odds * stake);
};
