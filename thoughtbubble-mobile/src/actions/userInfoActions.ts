import axios from 'axios';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { Direction, OrderType } from '../interfaces/stringLiteralTypes';
import { BASE_URL } from '@env';

export const fetchUserInfoAction = () => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .get(`${BASE_URL}/userinfo`, {
        params: { userSub },
      })
      .then((res) => {
        dispatch({ type: 'fetchUserInfo', payload: res.data });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeEmailSettingsAction = (emailSetting: string) => {
  if (emailSetting === 'daily') {
    return async (dispatch, getState) => {
      const userSub = getState().storedUser.sub;
      axios
        .put(`${BASE_URL}/userinfo/dailyemail`, {
          userSub,
        })
        .then(() => {
          dispatch({ type: 'toggleDailyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  } else {
    return async (dispatch, getState) => {
      const userSub = getState().storedUser.sub;
      axios
        .put(`${BASE_URL}/userinfo/weeklyemail`, {
          userSub,
        })
        .then(() => {
          dispatch({ type: 'toggleWeeklyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  }
};

export const changeDarkModeAction = () => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/userinfo/darkmode`, {
        userSub,
      })
      .then(() => {
        dispatch({ type: 'toggleDarkMode', payload: '' });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};
// ========
export const changeProjectOrderAction = (projectOrder: OrderType) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/userinfo/projectOrder`, {
        userSub,
        projectOrder,
      })
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_ORDER, payload: projectOrder });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeProjectDirectionAction = (projectDirection: Direction) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/userinfo/projectDirection`, {
        userSub,
        projectDirection,
      })
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_DIRECTION, payload: projectDirection });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeSaveOrderSettingAction = (projectOrder: OrderType, projectDirection: Direction) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/userinfo/saveOrder`, {
        userSub,
        projectOrder,
        projectDirection,
      })
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_SAVE_SETTING });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};
