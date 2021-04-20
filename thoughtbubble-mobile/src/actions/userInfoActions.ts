import axios from 'axios';

export const fetchUserInfoAction = () => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .get('http://localhost:3001/api/userinfo', {
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
        .put('http://localhost:3001/api/userinfo/dailyemail', {
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
        .put('http://localhost:3001/api/userinfo/weeklyemail', {
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
      .put('http://localhost:3001/api/userinfo/darkmode', {
        userSub,
      })
      .then(() => {
        dispatch({ type: 'toggleDarkMode', payload: '' });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};