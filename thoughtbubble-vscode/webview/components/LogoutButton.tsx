import * as React from 'react';
import { storeUserAction } from '../actions/storeUserAction';
import { useDispatch } from 'react-redux';
import { LogoutButtonProps } from '../interfaces/componentProps';

export const LogoutButton: React.FC<LogoutButtonProps> = ({ id }) => {
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
    <button id={id} type="button" onClick={() => logoutUser()}>
      Logout
    </button>
  );
};
