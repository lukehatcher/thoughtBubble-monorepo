import axios from 'axios';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { Direction, OrderType } from '../interfaces/stringLiteralTypes';
import { BASE_URL } from '@env';
import { getToken } from '../utils/asyncStorage';
import { AppThunk } from '../interfaces/redux';

export const fetchUserAction = (token: string): AppThunk<void> => {
  return async (dispatch) => {
    axios
      .get(`${BASE_URL}/userinfo`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        dispatch({ type: UserInfoActionTypes.FETCH, payload: res.data });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

// export const fetchUserAction = async (token: string): {type: string, data: any} => {
//   return async (dispatch) => {
//     axios
//       .get(`${BASE_URL}/userinfo`, { headers: { Authorization: `Bearer ${token}` } })
//       .then(async (res) => {
//         dispatch({ type: UserInfoActionTypes.FETCH, payload: res.data });
//       })
//       .catch((err) => console.error('@userInfoActions.ts: ', err));
//   };
// };

export const changeEmailSettingsAction = (emailSetting: string): AppThunk<void> => {
  if (emailSetting === 'daily') {
    return async (dispatch) => {
      const token = await getToken();
      axios
        .put(`${BASE_URL}/userinfo/dailyemail`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          dispatch({ type: UserInfoActionTypes.TOGGLE_DAILY_EMAIL, payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  } else {
    return async (dispatch) => {
      const token = await getToken();
      axios
        .put(`${BASE_URL}/userinfo/weeklyemail`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          dispatch({ type: UserInfoActionTypes.TOGGLE_WEEKLY_EMAIL, payload: '' });
        })
        .catch((err) => console.error('@userInfoActions.ts: ', err));
    };
  }
};

export const changeDarkModeAction = (): AppThunk<void> => {
  return async (dispatch) => {
    const token = await getToken();
    axios
      .put(`${BASE_URL}/userinfo/darkmode`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        dispatch({ type: UserInfoActionTypes.TOGGLE_DARKMODE, payload: '' });
      })
      .catch((err) => console.error('@userInfoActions.ts: ', err));
  };
};

export const changeProjectOrderAction = (projectOrder: OrderType): AppThunk<void> => {
  return async (dispatch) => {
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

export const changeProjectDirectionAction = (projectDirection: Direction): AppThunk<void> => {
  return async (dispatch) => {
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

export const changeSaveOrderSettingAction = (projectOrder: OrderType, projectDirection: Direction): AppThunk<void> => {
  return async (dispatch) => {
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
