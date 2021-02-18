export const storeUser = (jwt) => {
  // jwt: string | null
  // store user idToken in redux store
  return (dispatch) => {
    dispatch({ type: 'storeUser/set', payload: jwt });
  };
};
