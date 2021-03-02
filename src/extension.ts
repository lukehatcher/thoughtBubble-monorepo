// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// **logs here show up in the debug console**
import * as vscode from 'vscode';
import * as path from 'path';
import { getWebviewContent } from './webviewContent';
import {
  fetchData,
  fetchUserProjectNames,
  handleDbPost,
  handleDbPostInactive,
  handleDbDelete,
  handleTodoCompletionToggle,
} from './apiHandlers';

const PLACE_HOLDER = 'github|52586655';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  let panel: any;
  let activeWebview = false;

  context.subscriptions.push(
    vscode.commands.registerCommand('code-todos.todosView', async () => {
      console.log('=== EXTENSION IS LIVE ===');

      activeWebview = true;

      panel = vscode.window.createWebviewPanel(
        'view', // Identifies the type of the webview. Used internally
        'My Project Todos', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
          enableScripts: true, // Webview options
          retainContextWhenHidden: true,
        },
      );
    
      const onDiskPathScripts = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'main.js'));
      const onDiskPathStyles = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'styles.css'));
      const scriptsSrc = panel.webview.asWebviewUri(onDiskPathScripts);
      const stylesSrc = panel.webview.asWebviewUri(onDiskPathStyles);
      
      const onDiskPathResetStyles = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'reset.css'));
      const onDiskPathVSStyles = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'vscode.css'));
      const stylesResetUri = panel.webview.asWebviewUri(onDiskPathResetStyles);
      const stylesMainUri = panel.webview.asWebviewUri(onDiskPathVSStyles);
      
      panel.webview.html = getWebviewContent(scriptsSrc, stylesSrc, stylesResetUri, stylesMainUri);

      // fetch data and display to webview
      await fetchData(panel);

      // Handle messages from the webview;
      panel.webview.onDidReceiveMessage(
        async (message: any) => {
          const { command, type, username, projectName, todo, text } = message;
          switch (command) {
            case 'alert':
              vscode.window.showErrorMessage(text);
              break;
            case 'add project':
              // posts data and triggers page refresh with fetchData callback;
              await handleDbPost(type, username, projectName, todo, panel);
              break;
            case 'add todo':
              await handleDbPost(type, username, projectName, todo, panel);
              break;
            case 'delete project':
              await handleDbDelete(type, username, projectName, todo, panel);
              break;
            case 'delete todo':
              await handleDbDelete(type, username, projectName, todo, panel);
              break;
            case 'toggle todo':
              await handleTodoCompletionToggle(type, username, projectName, todo, panel);
              break;
          }
        },
        undefined,
        context.subscriptions,
      );

      panel.onDidDispose(
        () => {
          // set variable that signifies webview is open/close
          activeWebview = false;
        },
        null,
        context.subscriptions
      );

    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('code-todos.addtodo', async () => {

      const { activeTextEditor } = vscode.window;
      if (!activeTextEditor) {
        vscode.window.showErrorMessage('please activate a code editor to use this command');
        return;
      }

      const selectedText = activeTextEditor.document.getText(activeTextEditor.selection);

      const userProjectNames = await fetchUserProjectNames(); // used for the quickpick

      const quickPick = vscode.window.createQuickPick();
      quickPick.items = userProjectNames.map((label: string) => ({ label }));
      quickPick.onDidChangeSelection(([item]) => {
        if (item && activeWebview) {
          // if wevbiew is currently open, update database and webview
          handleDbPost('todo', PLACE_HOLDER, item.label, selectedText, panel);
          quickPick.dispose();
        } else if (item && !activeWebview) {
          // if wevbiew is not currently open, just update database
          handleDbPostInactive('todo', PLACE_HOLDER, item.label, selectedText);
          quickPick.dispose();
        }
      });
      // hide quickpicker if closed without a selection
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
    })
  );
}

// this method is called when the extension is deactivated
export function deactivate() {}
