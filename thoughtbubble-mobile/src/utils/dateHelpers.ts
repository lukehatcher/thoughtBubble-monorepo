export type activityRanges = '1W' | '1M' | '3M' | '6M' | '1Y';

/**
 * Methods for dealing with dates. Predominantly used in stats screen.
 */
export class DateHelper {
  // private static activityRangeMap: Map<string, number>;

  // constructor(public activityRangeMap) {
  //   this.activityRangeMap = new Map([
  //     ['1W', 7],
  //     ['1M', 30],
  //     ['3M', 91],
  //     ['6M', 183],
  //     ['1Y', 365],
  //   ]);
  // }

  /**
   * given a date in iso format, calculate days from app start date 4/1/2021
   * @param date from db in iso format `2021-05-04T21:34:08.689Z`
   * @returns date number
   */
  static getDayNumber(isoDate: string): number {
    const date = new Date(isoDate);
    const start = new Date(2021, 3, 1);
    const diff = (date as any) - (start as any);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayN = Math.floor(diff / oneDay);
    // console.log('Day of tB: ' + dayN);
    return dayN;
  }

  /**
   * create map which is used to create activity per day iterable
   * @returns a map contained the day #s out of 365 for the last week
   */
  static getLastNDayNumbers(range: activityRanges): Map<number, number> {
    const currentIso = new Date().toISOString();
    let currentDayNumb = this.getDayNumber(currentIso);
    const activityRangeMap = new Map([
      ['1W', 7],
      ['1M', 30],
      ['3M', 91],
      ['6M', 183],
      ['1Y', 365],
    ]);
    const N = activityRangeMap.get(range);
    const map = new Map<number, number>();
    for (let i = 0; i < N; i++) map.set(currentDayNumb--, 0);
    return map;
  }

  /**
   * @param lastUpdatedDate from db in iso format `2021-05-04T21:34:08.689Z`
   * @returns of the form `Mon Apr 12, 2021`
   */
  static parseOutTime(lastUpdatedDate: string): string {
    const dateTime = new Date(lastUpdatedDate).toString().split(' ');
    return dateTime.slice(0, 3).join(' ') + `, ${dateTime[3]}`;
  }

  /**
   * given day # from start date 4/1/2021, return `mm/dd` format
   * @param day
   * @returns
   */
  static dayToMMDD(day: string): string {
    return '';
  }
}
