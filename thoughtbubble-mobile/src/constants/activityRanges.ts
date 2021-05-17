import { ActivityRanges } from '../interfaces/stringLiteralTypes';

export enum activityRanges {
  '1W' = '1W',
  '1M' = '1M',
  '3M' = '3M',
  '6M' = '6M',
  '1Y' = '1Y',
}

export const activityRangeMap = new Map<ActivityRanges, number>([
  ['1W', 7],
  ['1M', 30],
  ['3M', 91],
  ['6M', 183],
  ['1Y', 365],
]);
