import { UserInfoShape } from '../interfaces/data';
import { Directions, OrderTypes } from '../constants/orders';
import { UserInfoActionTypes } from '../constants/actionTypes';

// const initialState: {data: UserInfoShape, status: string} = {
//   data: {
//     id: '',
//     email: '',
//     username: '',
//     githubId: '',
//     dailyEmail: true,
//     weeklyEmail: true,
//     darkMode: true,
//     projectOrder: OrderTypes.LAST_UPDATED,
//     projectDirection: Directions.DESC,
//     saveOrder: false,
//     avatarUrl: 'filler',
//     displayName: '',
//   }, status: 'idle',
// };

const initialState: UserInfoShape = {
  id: '',
  email: '',
  username: '',
  githubId: '',
  dailyEmail: true,
  weeklyEmail: true,
  darkMode: true,
  projectOrder: OrderTypes.LAST_UPDATED,
  projectDirection: Directions.DESC,
  saveOrder: false,
  avatarUrl: 'filler',
  displayName: '',
  status: 'idle',
};

export const userInfoReducer = (state = initialState, action): UserInfoShape => {
  const { payload, type } = action;
  switch (type) {
    case 'fetchUserInfo':
      return { ...payload, status: 'completed' };
    case 'toggleDailyEmail':
      return {
        ...state,
        dailyEmail: !state.dailyEmail,
      };
    case 'toggleWeeklyEmail':
      return {
        ...state,
        weeklyEmail: !state.weeklyEmail,
      };
    case 'toggleDarkMode':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case UserInfoActionTypes.UPDATE_ORDER:
      return { ...state, projectOrder: payload };
    case UserInfoActionTypes.UPDATE_DIRECTION:
      return { ...state, projectDirection: payload };
    case UserInfoActionTypes.UPDATE_SAVE_SETTING:
      return { ...state, saveOrder: !state.saveOrder };
    case 'recordNoUser':
      return { ...state, status: 'completed' };
    default:
      return state;
  }
};
