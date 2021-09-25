import * as React from 'react';
import { storeTokenAction } from '../actions/storeTokenAction';
import { useDispatch } from 'react-redux';
import { LogoutButtonProps } from '../interfaces/componentProps';

export const LogoutButton: React.FC<LogoutButtonProps> = ({ id }) => {
  const dispatch = useDispatch();

  const logout = async function () {
    // clear redux store (to force rerender and show login button (see HomeScreen.tsx for logic))
    dispatch(storeTokenAction(null));

    // clear global store in extension
    await vscodeGlobal.postMessage({
      command: 'logout',
      value: null,
    });
  };

  return (
    <button id={id} type="button" title="logout" onClick={() => logout()}>
      logout
    </button>
  );
};
