import * as vscode from 'vscode';
import * as polka from 'polka';
import { StateManager } from './stateManager';
import { createBrotliCompress } from 'zlib';

const authEndpoint = 'http://localhost:3001/auth/github/vscode';
const vscodeServerPort = 7777;

export const authenticate = (cb: () => void) => {
  const polkaServer = polka();

  polkaServer.get('/auth/:authToken', async (req, res) => {
    const { authToken } = req.params;
    if (!authToken) {
      res.end('<h1>error, something went wrong</h1>');
    }
    res.end('<h1>auth was sucessful</h1>');
    await StateManager.setToken(authToken);
    // send a message back to the view with the token in it so the view can change from logged out to logged in state
    cb();
    // (polkaServer as any).close();
  });

  polkaServer.listen(vscodeServerPort, (err: Error) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
    } else {
      vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${authEndpoint}`));
    }
  });
};
