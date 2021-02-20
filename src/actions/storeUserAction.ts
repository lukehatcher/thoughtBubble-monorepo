import axios from 'axios';
import { JwtPayload } from 'jwt-decode';

// thunk function
export const storeUser = (jwt: JwtPayload | null) => {
  // called from _onLogin util
  return async (dispatch) => {
    // add user to db if not exist
    // note: jwt is null when app opens and no one is logged in
    if (jwt !== null) {
      axios
        .post('http://localhost:3001/api/projects/init', {
          userSub: jwt.sub,
        })
        .catch((err) => console.error('error adding user/checking if user exists in db', err));
    }
    // set current user to redux store
    dispatch({ type: 'storeUser/set', payload: jwt });
  };
};
