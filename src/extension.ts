// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import axios from 'axios';

const PLACE_HOLDER = 'jon doe';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Create and show a new webview

  context.subscriptions.push(
    vscode.commands.registerCommand('code-todos.todosView', async () => {
      console.log('=== EXTENSION IS LIVE ===');

      const panel = vscode.window.createWebviewPanel(
        'view', // Identifies the type of the webview. Used internally
        'My Project Todos', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          enableScripts: true, // Webview options
        },
      );

      const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'methods.js'));
      const methodsSrc = panel.webview.asWebviewUri(onDiskPath);
      panel.webview.html = getWebviewContent(methodsSrc);

      // get data to display;
      await axios.get(`http://localhost:3001/api/projects/get/${PLACE_HOLDER}`)
        .then(async (response) => {
          const userData = response.data;
          console.log(userData);
          await panel.webview.postMessage({ command: 'sendingData', responseData: userData }); // whole obj = event.data
        })
        .catch((err) => {
          console.error('error fetching user data', err);
        });

      // Handle messages from the webview;
      panel.webview.onDidReceiveMessage(
        (message) => {
          const { command, type, username, projectName, todo, text } = message;
          switch (command) {
            case 'alert':
              vscode.window.showErrorMessage(text);
              break;
            case 'add project':
              handleDbPost(type, username, projectName, todo);
              break;
            case 'add todo':
              handleDbPost(type, username, projectName, todo);
              break;
          }
        },
        undefined,
        context.subscriptions,
      );
    }),
  );
}

function getWebviewContent(src: any) {
  return (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src self; img-src vscode-resource:; script-src vscode-resource: 'self' 'unsafe-inline'; style-src vscode-resource: 'self' 'unsafe-inline'; "/>
      <title>this is a title</title>
    </head>
    <body>
      <h1>Let's get to work!</h1>
      <h1 id="lines-of-code-counter">0</h1>

      <form id="project-form">
				<label>new project:</label>
				<input id="project-input" type="text">
        <input id="project-submit" type="submit">
      </form>

      <form id="todo-form">
				<label>new todo:</label>
        <input id="todo-input" type="text">
        <label>for project:</label>
        <select id="project-dropdown">
        </select>
				<input id="todo-submit" type="submit">
      </form>

      <div id="list-container"></div>
      <script src="${src}"></script>
    </body>
    <html>`
  );
}

// function getNonce() {
// 	let text = '';
// 	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	for (let i = 0; i < 32; i++) {
// 		text += possible.charAt(Math.floor(Math.random() * possible.length));
// 	}
// 	return text;
// }

// this method is called when your extension is deactivated
export function deactivate() {}


function handleDbPost(type: string, username: string, projectName: string, todo: string | null) {
  axios.post('http://localhost:3001/api/projects/post', {
    type,
    username, // hard coded username for now
    projectName,
    todo
  })
  .catch((err) => {
    console.error('error posting new data to db', err);
  });
}
