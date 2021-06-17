import axios from 'axios';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { Direction, OrderType } from '../interfaces/stringLiteralTypes';
import { BASE_URL } from '@env';
import { getToken } from '../utils/asyncStorage';

// TODO: need to edit route on api side
export const fetchUserAction = (token: string) => {
  return async (dispatch, _getState) => {
    axios
      .get(`${BASE_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        dispatch({ type: 'fetchUserInfo', payload: res.data });
      })
      .catch((err) => console.error(err));
  };
};

export const changeEmailSettingsAction = (emailSetting: string) => {
  if (emailSetting === 'daily') {
    return async (dispatch, _getState) => {
      const token = await getToken();
      axios
        .put(`${BASE_URL}/userinfo/dailyemail`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          dispatch({ type: 'toggleDailyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  } else {
    return async (dispatch, _getState) => {
      const token = await getToken();
      axios
        .put(`${BASE_URL}/userinfo/weeklyemail`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          dispatch({ type: 'toggleWeeklyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  }
};

export const changeDarkModeAction = () => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(`${BASE_URL}/userinfo/darkmode`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        dispatch({ type: 'toggleDarkMode', payload: '' });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeProjectOrderAction = (projectOrder: OrderType) => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(
        `${BASE_URL}/userinfo/projectOrder`,
        {
          projectOrder,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_ORDER, payload: projectOrder });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeProjectDirectionAction = (projectDirection: Direction) => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(
        `${BASE_URL}/userinfo/projectDirection`,
        {
          projectDirection,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_DIRECTION, payload: projectDirection });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeSaveOrderSettingAction = (projectOrder: OrderType, projectDirection: Direction) => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(
        `${BASE_URL}/userinfo/saveOrder`,
        {
          projectOrder,
          projectDirection,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_SAVE_SETTING });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};
