import { ActivityActionTypes } from '../constants/actionTypes';
import { DateHelper } from '../utils/dateHelpers';

// const initialState = [];

const initialState = {
  data: [],
  graphData: [],
};

interface Activity {
  data: Array<{
    id: string;
    activityDate: string; // Date string
    userId?: string; // not showing up for now
    projectId?: string; // not showing up for now
  }>;
  graphData: Array<{ x: number; y: number }>;
}

// interface Activity {
//   id: string;
//   activityDate: string; // Date string
//   userId: string;
//   projectId: string;
// }

// enum activityActionTypes {
// 	FETCH = 'activity/fetch',
// }

export const activityReducer = (state = initialState, action): Activity => {
  const { type, payload } = action;
  switch (type) {
    case ActivityActionTypes.FETCH: {
      // this case returns graph data in victory-native xy format
      const todayNumb = DateHelper.getDayNumber(new Date().toISOString());
      const map = new Map<number, number>();
      // create map of all possible days
      for (let i = 0; i <= todayNumb; i++) {
        map.set(i, 0);
      }
      // loop over db data and populate map
      for (let i = 0; i < payload.length; i++) {
        const day = DateHelper.getDayNumber(payload[i].activityDate);
        if (map.has(day)) {
          map.set(day, map.get(day) + 1);
        }
      }
      // turn populated map into graph data
      const graphData = [];
      map.forEach((val, key) => {
        graphData.push({ x: key, y: val });
      });
      return { ...state, graphData, data: payload };
    }
    default:
      return state;
  }
};
