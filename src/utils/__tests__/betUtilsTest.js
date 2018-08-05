import {
  calculateWinnings,
  decimalToFraction,
  fractionToDecimal
} from '../betUtils';

describe('Bet Utils', () => {
  describe('Fraction to Decimal', () => {
    const cases = [
      [1, 1, 2],
      [6, 5, 2.2],
      [3, 4, 1.75],
      [1, 5, 1.2],
      [9, 4, 3.25],
      [18, 5, 4.6]
    ];

    test.each(cases)(
      'should convert %s/%s franction to decimal %s',
      (numerator, denominator, expected) => {
        expect(fractionToDecimal(numerator, denominator)).toEqual(expected);
      }
    );
  });

  describe('Decimal to Fraction', () => {
    const cases = [
      [1.75, '3/4'],
      [1.5, '1/2'],
      [4.6, '18/5'],
      [2.0, '1/1'],
      [3.0, '2/1']
    ];

    test.each(cases)(
      'should convert %s franction to decimal %s',
      (fraction, expected) => {
        expect(decimalToFraction(fraction)).toEqual(expected);
      }
    );
  });

  describe('Calculate winnings', () => {
    const cases = [
      [2.0, 100, 200],
      [2.4, 100, 240],
      [4.6, 100, 460],
      [1.75, 100, 175]
    ];

    test.each(cases)(
      'should calculate odds %s with stake %s to equal winnings of %s',
      (odds, stake, expected) => {
        expect(calculateWinnings(odds, stake)).toEqual(expected);
      }
    );
  });
});
