import { isEmpty } from '../';

describe('Helper', () => {
  describe('isEmpty', () => {
    test('should handle empty string', () => {
      expect(isEmpty('')).toBeTruthy();
    });

    test('should handle empty object', () => {
      expect(isEmpty({})).toBeTruthy();
    });

    test('should handle empty array', () => {
      expect(isEmpty([])).toBeTruthy();
    });

    test('should handle string with value', () => {
      expect(isEmpty('value')).toBeFalsy();
    });

    test('should handle object with value', () => {
      expect(isEmpty({ id: 1234 })).toBeFalsy();
    });

    test('should handle array with value', () => {
      expect(isEmpty([1, 2, 3, 4, 5])).toBeFalsy();
    });
  });
});
