import axios from 'axios';
import { BASE_URL } from '../constants/config';

export const fetchUserInfoAction = () => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .get(`${BASE_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch({ type: 'fetchUserInfo', payload: res.data });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeEmailSettingsAction = (emailSetting: string) => {
  if (emailSetting === 'daily') {
    return async (dispatch, getState) => {
      const { token } = getState();
      if (!token) return; // TODO: validate if this logic is needed
      axios
        .put(`${BASE_URL}/userinfo/dailyemail`, { headers: { Authorization: `Bearer ${token}` } })
        .then((_res) => {
          dispatch({ type: 'toggleDailyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  } else {
    return async (dispatch, getState) => {
      const { token } = getState();
      if (!token) return; // TODO: validate if this logic is needed
      axios
        .put(`${BASE_URL}/userinfo/weeklyemail`, { headers: { Authorization: `Bearer ${token}` } })
        .then((_res) => {
          dispatch({ type: 'toggleWeeklyEmail', payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  }
};
