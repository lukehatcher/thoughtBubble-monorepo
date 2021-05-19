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
      const todayNumb = DateHelper.getDayNumber(new Date().toISOString());

      // ==== for all projects combined ====
      const graphDataMap = new Map<number, number>();
      for (let i = 0; i <= todayNumb; i++) {
        graphDataMap.set(i, 0); // create map of all possible days
      }
      const graphData: Array<{ x: number; y: number }> = [];

      // ==== split up by project ====
      const graphDataPerProject = {};

      // ==== populate activity maps ====
      for (let i = 0; i < payload.length; i++) {
        const { projectId } = payload[i];
        const day = DateHelper.getDayNumber(payload[i].activityDate);
        // handle map for all combined projects
        graphDataMap.set(day, graphDataMap.get(day) + 1);
        // handle individual project maps
        if (!graphDataPerProject[projectId]) {
          const map = new Map<number, number>();
          for (let i = 0; i <= todayNumb; i++) {
            map.set(i, 0);
          }
          graphDataPerProject[projectId] = map;
        } else {
          graphDataPerProject[projectId].set(day, graphDataPerProject[projectId].get(day) + 1);
        }
      }

      // ==== turn populated maps into graph data ====
      // for combined projects
      graphDataMap.forEach((val, key) => {
        graphData.push({ x: key, y: val });
      });
      // for individual projects
      for (let k in graphDataPerProject) {
        const projGraphData = []; // for curr proj
        graphDataPerProject[k].forEach((val, key) => {
          projGraphData.push({ x: key, y: val });
        });
        graphDataPerProject[k] = projGraphData;
      }

      return { ...state, data: payload, graphData, graphDataPerProject };
    }
    // switch (type) {
    //   case ActivityActionTypes.FETCH: {
    //     // this case returns graph data in victory-native xy format
    //     const todayNumb = DateHelper.getDayNumber(new Date().toISOString());
    //     const map = new Map<number, number>();
    //     // create map of all possible days
    //     for (let i = 0; i <= todayNumb; i++) {
    //       map.set(i, 0);
    //     }
    //     // loop over db data and populate map and populate graphDataPerProject keyfor let i
    //     // const graphDataPerProject = {}; // HELP
    //     for (let i = 0; i < payload.length; i++) {
    //       const day = DateHelper.getDayNumber(payload[i].activityDate);
    //       if (map.has(day)) {
    //         map.set(day, map.get(day) + 1);
    //       }
    //       // add a key to graphDataPerProject for each unique projectId in the activity array
    //       if (graphDataPerProject[payload[i].projectId]) continue;
    //       else graphDataPerProject[payload[i]] = [];
    //     }
    //     // turn populated map into graph data
    //     const graphData = [];
    //     map.forEach((val, key) => {
    //       graphData.push({ x: key, y: val });
    //     });
    //     return { ...state, data: payload, graphData, graphDataPerProject };
    //   }
    default:
      return state;
  }
};
