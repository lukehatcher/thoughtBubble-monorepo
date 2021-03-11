import * as vscode from 'vscode';
import { getNonce } from './generateNonce';
import { Credentials } from './credentials';
import { StateManager } from './stateManager';

export async function activate(context: vscode.ExtensionContext) {

	StateManager.globalState = context.globalState; // so i can reference state anywhere

	// ================================================
	const credentials = new Credentials();
	await credentials.initialize(context);

	const disposable = vscode.commands.registerCommand('thoughtBubble.login', async () => {
		/**
		 * Octokit (https://github.com/octokit/rest.js#readme) is a library for making REST API
		 * calls to GitHub. It provides convenient typings that can be helpful for using the API.
		 * ...Documentation on GitHub's REST API can be found here: https://docs.github.com/en/rest
		 */
		const octokit = await credentials.getOctokit();
		const userInfo = await octokit.users.getAuthenticated();

		vscode.window.showInformationMessage(`Logged into thoughtBubble via GitHub as ${userInfo.data.login}`);
		// send message
		StateManager.setToken(JSON.stringify(userInfo.data));
	});
	context.subscriptions.push(disposable);
	// ================================================
	
	context.subscriptions.push(
		vscode.commands.registerCommand('thoughtBubble.start', () => {
			MainPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('thoughtBubble.kill', () => {
			MainPanel.kill();
		})
	);

}

// ===============================================================================================
class MainPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: MainPanel | undefined;

	public static readonly viewType = 'thoughtBubble';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
		// If you already have the tab open, show it.
		if (MainPanel.currentPanel) {
			MainPanel.currentPanel._panel.reveal(column);
			return;
		}
		// Otherwise, create a new panel (aka tab).
		const panel = vscode.window.createWebviewPanel(
			MainPanel.viewType, // Identifies the type of the webview. Used internally // ??????
			'thoughtBubble', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
			}
		);
		MainPanel.currentPanel = new MainPanel(panel, extensionUri);
	}

	public static kill() {
    MainPanel.currentPanel?.dispose();
    MainPanel.currentPanel = undefined;
  }

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		MainPanel.currentPanel = new MainPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._render(this._panel.webview);

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.value);
						return;
					case 'getUser':
						const userData = StateManager.getToken() || '';
						vscode.window.showInformationMessage(userData); // dont need
						this._panel.webview.postMessage({ command: 'sendingData', userData }); // whole obj = event.data;
						// panel.webview.postMessage({ command: 'sendingData', responseData: userData }); // whole obj = event.data;
						return;
					case 'logout':
						// this._panel.webview.postMessage({ command: 'sendingData', userData: null });
						// CLEAR SESSION
						StateManager.removeToken();
						// this._panel.webview
						return;
					case 'login':
						// execute login then post message to webview where redux store is updated
						vscode.commands.executeCommand('thoughtBubble.login').then(() => {
							this._panel.webview.postMessage({ command: 'sendingData', userData: StateManager.getToken()});
						})
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public dispose() {
		MainPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _render(webview: vscode.Webview) {
		this._panel.title = 'thoughtBubble';
		this._panel.webview.html = this._getHtmlForWebview(webview);
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'reactBundle.js');

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		// Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');

		// Uri to load styles into webview
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

		// Use a nonce to only allow specific scripts to be run;
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">
				<script nonce="${nonce}">
					const vscodeGlobal = acquireVsCodeApi();
				</script>
			</head>
			<body>
				<div id="root"></div>
				<h1>ts-react into vscode :)</h1>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
