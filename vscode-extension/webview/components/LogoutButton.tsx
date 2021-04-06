import * as React from 'react';
import { storeUserAction } from '../actions/storeUserAction';
import { useDispatch } from 'react-redux';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const logoutUser = async function () {
    // clear redux store (to force rerender)
    dispatch(storeUserAction(null));

    // clear global store in extension
    await vscodeGlobal.postMessage({
      command: 'logout',
      value: null,
    });
  };

  return (
    <button type="button" id="logout-btn" onClick={() => logoutUser()}>
      Logout
    </button>
  );
};
