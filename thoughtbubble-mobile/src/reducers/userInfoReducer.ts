import { UserInfoShape } from '../interfaces/data';
import { Directions, OrderTypes } from '../constants/orders';
import { UserInfoActionTypes } from '../constants/actionTypes';

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
};

export const userInfoReducer = (state = initialState, action): UserInfoShape => {
  const { payload, type } = action;
  switch (type) {
    case 'fetchUserInfo':
      return payload;
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
    // new bois
    // payload: { orderType: type, direction: direction }
    case UserInfoActionTypes.UPDATE_PROJ_DISPLAY:
      return { ...state, projectOrder: payload.projectOrder, projectDirection: payload.projectDirection };
    // case UserInfoActionTypes.UPDATE_PROJ_ORDER:
    //   return { ...state, projectOrder: payload };
    // case UserInfoActionTypes.UPDATE_PROJ_DIRECTION:
    //   return { ...state, projectDirection: payload };
    default:
      return state;
  }
};
