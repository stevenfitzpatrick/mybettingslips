var Fraction = require('fractional').Fraction;

import { results } from '../store/bet.constants';

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
 * @returns {string} winnings
 */
export const calculateWinnings = (odds, stake, display = true) => {
  const total = Math.ceil(odds * stake);
  return display ? total.toLocaleString() : total;
};

/**
 *
 * @param {enum} result
 * @param {float} winnings
 * @param {floot} stake
 * @returns {string}
 */
export const calculateResult = (
  result = results.OPEN,
  winnings = 0,
  stake = 0
) => {
  let resultDisplay = '';
  if (result === results.OPEN || result === results.VOID) resultDisplay = '-';
  else if (result === results.WIN) resultDisplay = `+ €${winnings}`;
  else if (result === results.LOSS) resultDisplay = `- €${stake}`;

  return resultDisplay;
};

/**
 * @description
 * Calculate the overall summary for the users bets
 * @returns {string} Total
 */
export const calculateUserBetTotal = (bets = []) =>
  bets.reduce((total, { odds, stake, result }) => {
    if (result === results.WIN) {
      total += calculateWinnings(odds, stake, false);
    } else {
      total -= stake;
    }

    return total;
  }, 0);
