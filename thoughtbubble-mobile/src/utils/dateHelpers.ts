import { activityRangeMap } from '../constants/activityRanges';
import { ActivityRanges } from '../interfaces/stringLiteralTypes';

/**
 * Methods for dealing with dates. Predominantly used in stats screen.
 */
export class DateHelper {
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
  static getLastNDayNumbers(range: ActivityRanges): Map<number, number> {
    const currentIso = new Date().toISOString();
    let currentDayNumb = this.getDayNumber(currentIso);
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
   * @param day # from start date 4/1/2021
   * @returns date object of the date #
   */
  static dayNToDate(dayN: number): Date {
    const result = new Date(2021, 3, 1);
    result.setDate(result.getDate() + dayN);
    return result;
  }

  static dateToMMDDYYY(date: Date): string {
    // from SO
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }

  /**
   * given array of x, y coords generate x label of the form "mm/dd/yyyy -> mm/dd/yyyy"
   * @param graphData xy, pairs for victorychart
   * @param currRange 7, 30, 91 etc...
   * @returns "mm/dd/yyyy -> mm/dd/yyyy"
   */
  static generateXaxisDateLabel(graphData: Array<{ x: number; y: number }>, currRange: number): string {
    const xys = graphData.slice(-1 * currRange);
    const first = this.dateToMMDDYYY(this.dayNToDate(xys[0].x));
    const last = this.dateToMMDDYYY(this.dayNToDate(xys[xys.length - 1].x));
    return `${first}  →  ${last}`;
  }
}
