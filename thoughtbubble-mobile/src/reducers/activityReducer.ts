import { ActivityActionTypes } from '../constants/actionTypes';

const initialState = [];

interface Activity {
  id: string;
  activityDate: string; // Date string
  userId: string;
  projectId: string;
}

// enum activityActionTypes {
// 	FETCH = 'activity/fetch',
// }

export const activityReducer = (state = initialState, action): Activity[] => {
  switch (action.type) {
    case ActivityActionTypes.FETCH:
      return action.payload;
    default:
      return state;
  }
};
