import axios from 'axios';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '../constants/config';
import { Directions, OrderTypes } from '../constants/orders';
import { AppThunk } from '../interfaces/redux';

const fname = '@userInfoActions.ts: ';

export const fetchUserInfoAction = () => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .get(`${BASE_URL}/userinfo`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch({ type: UserInfoActionTypes.FETCH, payload: res.data });
      })
      .catch((err) => console.error(fname, err));
  };
};

export const changeProjectOrderAction = (projectOrder: OrderTypes): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { token } = getState();
    axios
      .put(
        `${BASE_URL}/userinfo/projectOrder`,
        {
          projectOrder,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_ORDER, payload: projectOrder });
      })
      .catch((err) => console.error(fname, err));
  };
};

export const changeProjectDirectionAction = (projectDirection: Directions): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { token } = await getState();
    axios
      .put(
        `${BASE_URL}/userinfo/projectDirection`,
        {
          projectDirection,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_DIRECTION, payload: projectDirection });
      })
      .catch((err) => console.error(fname, err));
  };
};

export const changeSaveOrderSettingAction = (
  projectOrder: OrderTypes,
  projectDirection: Directions
): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { token } = await getState();
    axios
      .put(
        `${BASE_URL}/userinfo/saveOrder`,
        {
          projectOrder,
          projectDirection,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        dispatch({ type: UserInfoActionTypes.UPDATE_SAVE_SETTING });
      })
      .catch((err) => console.error(fname, err));
  };
};

// export const changeEmailSettingsAction = (emailSetting: string) => {
//   if (emailSetting === 'daily') {
//     return async (dispatch, getState) => {
//       const { token } = getState();
//       if (!token) return; // TODO: validate if this logic is needed
//       axios
//         .put(`${BASE_URL}/userinfo/dailyemail`, { headers: { Authorization: `Bearer ${token}` } })
//         .then((_res) => {
//           dispatch({ type: 'toggleDailyEmail', payload: '' });
//         })
//         .catch((err) => console.error('@userInfoActions.ts: ', err));
//     };
//   } else {
//     return async (dispatch, getState) => {
//       const { token } = getState();
//       if (!token) return; // TODO: validate if this logic is needed
//       axios
//         .put(`${BASE_URL}/userinfo/weeklyemail`, { headers: { Authorization: `Bearer ${token}` } })
//         .then((_res) => {
//           dispatch({ type: 'toggleWeeklyEmail', payload: '' });
//         })
//         .catch((err) => console.error('@userInfoActions.ts: ', err));
//     };
//   }
// };
