import * as React from 'react';

export const LoginButton: React.FC = () => {
  const loginUser = async function () {
    // fires message to the extension to launch "thoughtBubble: show thoughts" command
    // a response messge is sent back to update the redux store
    await vscodeGlobal.postMessage({
      command: 'login',
      value: null,
    });
  };

  return (
    <div>
      <button onClick={() => loginUser()}>LOGIN</button>
    </div>
  );
};
