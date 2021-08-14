import { UserInfoShape } from '../interfaces/data';
import { Directions, OrderTypes } from '../constants/orders';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { UserInfoAction, UserInfoLoadingStatus } from '../interfaces/redux';

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
  loadingStatus: UserInfoLoadingStatus.IDLE,
};

export const userInfoReducer = (state = initialState, action: UserInfoAction): UserInfoShape => {
  const { payload, type } = action;
  switch (type) {
    case UserInfoActionTypes.FETCH:
      return {
        ...(payload as UserInfoShape),
        loadingStatus: UserInfoLoadingStatus.COMPLETED,
      };
    case UserInfoActionTypes.TOGGLE_DAILY_EMAIL:
      return {
        ...state,
        dailyEmail: !state.dailyEmail,
      };
    case UserInfoActionTypes.TOGGLE_WEEKLY_EMAIL:
      return {
        ...state,
        weeklyEmail: !state.weeklyEmail,
      };
    case UserInfoActionTypes.TOGGLE_DARKMODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case UserInfoActionTypes.UPDATE_ORDER:
      return {
        ...state,
        projectOrder: payload as OrderTypes,
      };
    case UserInfoActionTypes.UPDATE_DIRECTION:
      return {
        ...state,
        projectDirection: payload as Directions,
      };
    case UserInfoActionTypes.UPDATE_SAVE_SETTING:
      return {
        ...state,
        saveOrder: !state.saveOrder,
      };
    case UserInfoActionTypes.RECORD_NO_USER:
      return {
        ...state,
        loadingStatus: UserInfoLoadingStatus.COMPLETED,
      };
    default:
      return state;
  }
};
