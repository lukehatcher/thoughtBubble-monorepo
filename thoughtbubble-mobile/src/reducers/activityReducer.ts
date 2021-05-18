import { ActivityActionTypes } from '../constants/actionTypes';
import { DateHelper } from '../utils/dateHelpers';
import { Activity } from '../interfaces/data';

const initialState = {
  data: [],
  graphData: [],
};

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
