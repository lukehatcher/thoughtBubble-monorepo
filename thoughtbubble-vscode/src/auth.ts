import * as vscode from 'vscode';
import * as polka from 'polka';
import { Server } from 'http';
import { StateManager } from './stateManager';

// TODO: add env
const authEndpoint = 'http://localhost:3001/auth/github/vscode';
const PORT = 7777;

export const authenticate = (cb: () => void) => {
  const app = polka();

  app.get('/auth/:authToken', async (req, res) => {
    const { authToken } = req.params;
    if (!authToken) {
      res.end('<h1>oh no! looks like something went wrong... please close the tab and retry</h1>');
    }
    res.end(
      `
          <div>
            <div class="container">
              <h1>ThoughtBubble</h1>
              <h3>authorization was successful, you can close this tab and return to VSCode</h3>
              <a href="https://github.com/lukehatcher/thoughtBubble-monorepo">visit repo here</a>
            </div>
            <style>
              .container {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              }
            </style>
            <script>
              // this.document.location = 'vscode://';
              // window.close();
            </script>
          </div>
      `
    );
    // res.end('<script> this.document.location = "vscode://"; </script>');
    // res.end('<script> this.document.location = "vscode://"; window.close(); </script>'); // this version does not redirect you to vscode, it just closes out
    await StateManager.setToken(authToken);
    // this cb sends a vscode-message back to the view with the access token in it so the view can change state from logged out to logged in
    cb();
    (app.server as Server).close();
  });

  app.listen(PORT, (err: Error) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
    } else {
      vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${authEndpoint}`));
    }
  });
};
