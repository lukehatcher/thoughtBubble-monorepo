import * as vscode from 'vscode';
import * as polka from 'polka';
import { StateManager } from './stateManager';

const authEndpoint = 'http://localhost:3001/auth/github/vscode';
const vscodeServerPort = 7777;

export const authenticate = () => {
  const polkaServer = polka();

  polkaServer.get('/auth/:authToken', async (req, res) => {
    const { authToken } = req.params;
    if (!authToken) {
      res.end('<h1>error, something went wrong</h1>');
    }
    console.log(authToken);
    res.end('<h1>auth was sucessful</h1>');
    await StateManager.setToken(authToken);
    (polkaServer as any).close();
  });

  polkaServer.listen(vscodeServerPort, (err: Error) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
    } else {
      vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${authEndpoint}`));
    }
  });
};
