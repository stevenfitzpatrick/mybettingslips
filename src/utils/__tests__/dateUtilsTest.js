import { formatDate, formatRelativeDate, getCurrentDate } from '../dateUtils';

describe('Date Utils', () => {
  test('should should format new date', () => {
    console.log(getCurrentDate());
    console.log(formatDate('2018-09-22T20:16:05.000Z'));
    console.log(formatDate('2018-09-20T20:16:05.000Z'));
  });
});
