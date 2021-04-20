import axios from 'axios';

export const fetchUserInfoAction = () => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .get('http://localhost:3001/api/userinfo', {
        params: { userSub },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: 'toggleDailyEmail', payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const changeEmailSettingsAction = () => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .put('http://localhost:3001/api/userinfo/email', {
        userSub,
      })
      .then((res) => {
        dispatch({ type: 'toggleDailyEmail', payload: '' });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};
