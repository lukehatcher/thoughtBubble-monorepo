export const changeLoginStatus = (status: boolean) => {
  // call this on login and logout to set the state
  // the store update from this action causes the correct rerenders
  return (dispatch) => {
    dispatch({ type: 'loginStatus/change', payload: status });
  };
};
