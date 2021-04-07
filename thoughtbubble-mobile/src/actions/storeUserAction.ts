import axios from 'axios';
import { JwtPayload } from 'jwt-decode'; // type

export const storeUserAction = (jwt: JwtPayload | null) => {
  // called from _onLogin util
  return async (dispatch) => {
    // add user to db if not exist
    // note: jwt is null when app opens and no one is logged in
    if (jwt !== null) {
      axios
        .post('http://localhost:3001/api/projects/init', {
          userSub: jwt.sub,
        })
        .then(() => {
          dispatch({ type: 'storeUser/set', payload: jwt });
          console.log('user data should be posted now');
        })
        .catch((err) => console.error('error adding user/checking if user exists in db', err));
    } else {
      dispatch({ type: 'storeUser/set', payload: jwt }); // jwt = null here
    }
  };
};
