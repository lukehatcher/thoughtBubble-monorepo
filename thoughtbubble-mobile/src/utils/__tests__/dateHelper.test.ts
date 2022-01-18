import { DateHelper } from '../dateHelpers';

describe('Testing DateHelper util class', () => {
  describe('`.getDayNumber` static method', () => {
    test('Given an ISO date in the future, should return days since (4/1/2021) ', () => {
      const testIsoDate = new Date('June 1, 2021').toISOString();
      const value = DateHelper.getDayNumber(testIsoDate);
      expect(value).toBe(61);
    });
    test('Given start date (4/1/2021), should return 0 days', () => {
      const testIsoDate = new Date('April 1, 2021').toISOString();
      const value = DateHelper.getDayNumber(testIsoDate);
      expect(value).toBe(0);
    });
    test('Given start date (4/1/2021), should return 0 days', () => {
      const testIsoDate = new Date('April 1, 2021').toISOString();
      const value = DateHelper.getDayNumber(testIsoDate);
      expect(value).toBe(0);
    });
    test('Given date prior to (4/1/2021), should return 0 days', () => {
      const testIsoDate = new Date('January 1, 2021').toISOString();
      const value = DateHelper.getDayNumber(testIsoDate);
      expect(value).toBe(0);
    });
  });

  describe('`.parseOutTime` static method', () => {
    test('Given an ISO date, return string in format `Mon Apr 12, 2021`', () => {
      const testIsoDate = new Date('April 12, 2021').toISOString();
      const value = DateHelper.parseOutTime(testIsoDate);
      expect(value).toBe('Mon Apr 12, 2021');
    });
  });

  describe('`.dayNToDate` static method', () => {
    test('Given a number of days from app start date (4/1/2021), return Date object', () => {
      const actual = DateHelper.dayNToDate(5);
      const expected = new Date('April 6, 2021');
      expect(actual.toDateString()).toBe(expected.toDateString());
    });
    test('Given a 0 days from app start date (4/1/2021)', () => {
      const actual = DateHelper.dayNToDate(0);
      const expected = new Date('April 1, 2021');
      expect(actual.toDateString()).toBe(expected.toDateString());
    });
    test('Given negative day number, throw error', () => {
      expect(() => DateHelper.dayNToDate(-10)).toThrow(TypeError);
    });
  });

  describe('`.dateToMMDDYYY` static method', () => {
    test('Given a JS date object, return date in MM/DD/YYYY format', () => {
      const actual = DateHelper.dateToMMDDYYY(new Date('June 1 2021'));
      expect(actual).toBe('06/01/2021');
    });
  });

  describe('`.generateXaxisDateLabel` static method', () => {
    test('Given array of x, y coords (including start app start date N (0)) generate x-axis label of the form "mm/dd/yyyy -> mm/dd/yyyy"', () => {
      // x is day # from 4/1/21
      const data = [
        { x: 0, y: Math.random() },
        { x: 1, y: Math.random() },
        { x: 2, y: Math.random() },
        { x: 3, y: Math.random() },
        { x: 4, y: Math.random() },
        { x: 5, y: Math.random() },
        { x: 6, y: Math.random() },
      ];
      const actual = DateHelper.generateXaxisDateLabel(data, 7);
      console.log(actual);
      expect(actual).toBe('04/01/2021  →  04/07/2021');
    });
  });
  test('Given array of x, y coords generate x-axis label of the form "mm/dd/yyyy -> mm/dd/yyyy"', () => {
    const data = [
      { x: 10, y: Math.random() },
      { x: 11, y: Math.random() },
      { x: 12, y: Math.random() },
      { x: 13, y: Math.random() },
      { x: 14, y: Math.random() },
      { x: 15, y: Math.random() },
      { x: 16, y: Math.random() },
    ];
    const actual = DateHelper.generateXaxisDateLabel(data, 7);
    expect(actual).toBe('04/11/2021  →  04/17/2021');
  });
  test('Given array of x, y coords with range longer than data, generate x-axis label of the form "mm/dd/yyyy -> mm/dd/yyyy"', () => {
    const data = [
      { x: 10, y: Math.random() },
      { x: 11, y: Math.random() },
      { x: 12, y: Math.random() },
      { x: 13, y: Math.random() },
      { x: 14, y: Math.random() },
      { x: 15, y: Math.random() },
      { x: 16, y: Math.random() },
    ];
    const actual = DateHelper.generateXaxisDateLabel(data, 31);
    console.log(actual, 'asdf');
    expect(actual).toBe('04/11/2021  →  04/17/2021');
  });
});
