// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "code-todos" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('code-todos.test', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('this is a test');
  });

  context.subscriptions.push(disposable);

  // ==================================================

  context.subscriptions.push(
    vscode.commands.registerCommand('code-todos.todosView', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        'view', // Identifies the type of the webview. Used internally
        'My Project Todos', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          enableScripts: true, // Webview options
        },
      );

      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'src', 'html', 'methods.js'),
      );
      const methodsSrc = panel.webview.asWebviewUri(onDiskPath);

      panel.webview.html = getWebviewContent(methodsSrc);

      // Handle messages from the webview
      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case 'alert':
              vscode.window.showErrorMessage(message.text);
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
			<h1>hello test test</h1>
			<h1 id="lines-of-code-counter">0</h1>
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
