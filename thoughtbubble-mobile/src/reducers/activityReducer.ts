import { ActivityActionTypes } from '../constants/actionTypes';
import { DateHelper } from '../utils/dateHelpers';
import { Point, Activity, ActivityReducerAction } from '../interfaces/redux';

const initialState: Activity = {
  data: [],
  graphData: [],
  graphDataPerProject: {},
};

export const activityReducer = (state = initialState, action: ActivityReducerAction): Activity => {
  const { type, payload } = action;
  switch (type) {
    case ActivityActionTypes.FETCH: {
      const todayNumb = DateHelper.getDayNumber(new Date().toISOString());

      // ==== for all projects combined ====
      const graphDataMap = new Map<number, number>();
      for (let i = 0; i <= todayNumb; i++) {
        graphDataMap.set(i, 0); // create map of all possible days
      }
      const graphData: Point[] = [];

      // ==== split up by project ====
      const graphDataPerProjectMap: { [key: string]: Map<number, number> } = {};

      // ==== populate activity maps ====
      for (let i = 0; i < payload.length; i++) {
        const { projectId } = payload[i];
        const day = DateHelper.getDayNumber(payload[i].activityDate);
        // handle map for all combined projects
        graphDataMap.set(day, graphDataMap.get(day) + 1);
        // handle individual project maps
        if (!graphDataPerProjectMap[projectId]) {
          const map = new Map<number, number>();
          for (let i = 0; i <= todayNumb; i++) {
            map.set(i, 0);
          }
          graphDataPerProjectMap[projectId] = map;
        } else {
          graphDataPerProjectMap[projectId].set(day, graphDataPerProjectMap[projectId].get(day) + 1);
        }
      }

      // ==== turn populated maps into graph data ====
      // for combined projects
      graphDataMap.forEach((val, key) => {
        graphData.push({ x: key, y: val });
      });
      // for individual projects
      const graphDataPerProject: { [key: string]: Point[] } = {}; // return object
      for (const k in graphDataPerProjectMap) {
        const projGraphData: Point[] = []; // for curr proj
        graphDataPerProjectMap[k].forEach((val, key) => {
          projGraphData.push({ x: key, y: val });
        });
        graphDataPerProject[k] = projGraphData;
      }

      return { ...state, data: payload, graphData, graphDataPerProject };
    }
    default:
      return state;
  }
};
