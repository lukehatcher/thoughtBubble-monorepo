import { ActivityRanges } from '../interfaces/stringLiteralTypes';

export const activityRangeMap: Record<ActivityRanges, number> = {
  '1W': 7,
  '1M': 30,
  '3M': 91,
  '6M': 183,
  '1Y': 365,
};
