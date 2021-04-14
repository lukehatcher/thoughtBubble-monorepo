import axios from 'axios';

export const changeEmailSettingsAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .put('http://localhost:3001/api/email', {
        userSub,
      })
      .then((res) => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};
