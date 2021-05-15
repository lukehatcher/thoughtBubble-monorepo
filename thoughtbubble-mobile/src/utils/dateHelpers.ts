/**
 * Methods for dealing with dates. Predominantly used in stats screen.
 */
export class DateHelper {
  constructor() {}

  /**
   * given a date, return which # out of 365(6) it is
   * @param date from db in iso format `2021-05-04T21:34:08.689Z`
   */
  static getDayOutOf365 = function (isoDate: string): number {
    const date = new Date(isoDate);
    console.log(date.getFullYear());
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date as any) - (start as any);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayN = Math.floor(diff / oneDay);
    console.log('Day of year: ' + dayN);
    return dayN;
  };

  /**
   *
   * @returns a map contained the day #s out of 365 for the last week
   */
  static getLast7DaysOutOf365 = function (): Map<number, number> {
    const currentIso = new Date().toISOString();
    let currentDayNumb = this.getDayOutOf365(currentIso);
    const map = new Map<number, number>();
    for (let i = 0; i < 7; i++) map.set(currentDayNumb--, 0);
    return map;
  };

  /**
   * @param lastUpdatedDate from db in iso format `2021-05-04T21:34:08.689Z`
   * @returns of the form `Mon Apr 12, 2021`
   */
  static parseOutTime = function (lastUpdatedDate: string): string {
    const dateTime = new Date(lastUpdatedDate).toString().split(' ');
    return dateTime.slice(0, 3).join(' ') + `, ${dateTime[3]}`;
  };

  /**
   * map day # to 365
   * @param day
   * @returns
   */
  static dayToMMDD = function (day: string): string {
    return '';
  };
}
