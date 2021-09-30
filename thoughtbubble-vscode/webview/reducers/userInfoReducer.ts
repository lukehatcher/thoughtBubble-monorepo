import { UserInfoActionTypes } from '../constants/actionTypes';
import { Directions, OrderTypes } from '../constants/orders';
import { UserInfoShape } from '../interfaces/data';

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
};

export const userInfoReducer = (state = initialState, action): UserInfoShape => {
  const { payload, type } = action;
  switch (type) {
    case UserInfoActionTypes.FETCH:
      return payload;
    case UserInfoActionTypes.UPDATE_ORDER:
      return {
        ...state,
        projectOrder: payload as OrderTypes,
      };
    // case 'toggleDailyEmail':
    //   return {
    //     ...state,
    //     dailyEmail: !state.dailyEmail,
    //   };
    // case 'toggleWeeklyEmail':
    //   return {
    //     ...state,
    //     weeklyEmail: !state.weeklyEmail,
    //   };
    default:
      return state;
  }
};
