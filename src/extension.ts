// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import axios from 'axios';
import { getWebviewContent } from './webviewContent';
import { handleDbPost, handleDbDelete } from './apiHandlers';

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
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
          enableScripts: true, // Webview options
          retainContextWhenHidden: true,
        },
      );

      const onDiskPathScripts = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'methods.js'));
      const onDiskPathStyles = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'styles.css'));
      const scriptsSrc = panel.webview.asWebviewUri(onDiskPathScripts);
      const stylesSrc = panel.webview.asWebviewUri(onDiskPathStyles);
      panel.webview.html = getWebviewContent(scriptsSrc, stylesSrc);

      // get data to display
      async function fetchData() {
        await axios.get(`http://localhost:3001/api/projects/get/${PLACE_HOLDER}`)
          .then(async (response) => {
            const userData = response.data;
            await panel.webview.postMessage({ command: 'sendingData', responseData: userData }); // whole obj = event.data;
          })
          .catch((err) => {
            console.error('error fetching user data', err);
          });
      }
      await fetchData();

      // Handle messages from the webview;
      panel.webview.onDidReceiveMessage(
        async (message) => {
          const { command, type, username, projectName, todo, text } = message;
          switch (command) {
            case 'alert':
              vscode.window.showErrorMessage(text);
              break;
            case 'add project':
              // posts data and triggers page refresh with fetchData callback;
              await handleDbPost(type, username, projectName, todo, fetchData);
              break;
            case 'add todo':
              await handleDbPost(type, username, projectName, todo, fetchData);
              break;
            case 'delete project':
              await handleDbDelete(type, username, projectName, todo, fetchData);
              break;
            case 'delete todo':
              await handleDbDelete(type, username, projectName, todo, fetchData);
              break;
          }
        },
        undefined,
        context.subscriptions,
      );
    }),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
