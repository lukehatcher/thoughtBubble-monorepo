import axios from 'axios';
import { BASE_URL, DEV_TOKEN } from '../constants/config';

export const fetchUserInfoAction = () => {
  return async (dispatch, _getState) => {
    axios
      .get(`${BASE_URL}/user`, { headers: { Authorization: `Bearer ${DEV_TOKEN}` } })
      .then((res) => {
        dispatch({ type: 'fetchUserInfo', payload: res.data });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeEmailSettingsAction = (emailSetting: string) => {
  if (emailSetting === 'daily') {
    return async (dispatch, _getState) => {
      axios
        .put(`${BASE_URL}/userinfo/dailyemail`, { headers: { Authorization: `Bearer ${DEV_TOKEN}` } })
        .then(() => {
          dispatch({ type: 'toggleDailyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  } else {
    return async (dispatch, _getState) => {
      axios
        .put(`${BASE_URL}/userinfo/weeklyemail`, { headers: { Authorization: `Bearer ${DEV_TOKEN}` } })
        .then(() => {
          dispatch({ type: 'toggleWeeklyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  }
};
