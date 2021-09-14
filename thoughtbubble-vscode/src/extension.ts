import * as vscode from 'vscode';
import { getNonce } from './generateNonce';
import { StateManager } from './stateManager';
import { addThoughtFromQuickPick, fetchQuickPickData } from './quickPick';
import { projectTuple } from './interfaces';

export async function activate(context: vscode.ExtensionContext) {
  StateManager.globalState = context.globalState; // so i can reference state anywhere

  context.subscriptions.push(
    vscode.commands.registerCommand('thoughtBubble.authenticate', () => {
      console.log('called auth function');
      // vscode.window.showInformationMessage(`Logged into thoughtBubble via GitHub as ${userInfo.data.login}`);
    })
  );

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

  context.subscriptions.push(
    vscode.commands.registerCommand('thoughtBubble.addThought', async () => {
      const { activeTextEditor } = vscode.window;
      if (!activeTextEditor) {
        vscode.window.showErrorMessage('please open a code editor to use this command');
        return;
      }
      const selectedText = activeTextEditor.document.getText(activeTextEditor.selection);
      const projectData = await fetchQuickPickData();
      if (!projectData) {
        vscode.window.showErrorMessage('please log into thoughtBubble to use this command');
        return;
      }
      // extend quickpickitem to take a hidden id prop
      const quickPick: vscode.QuickPick<vscode.QuickPickItem & { projectId: string }> = vscode.window.createQuickPick();
      quickPick.items = projectData!.map((proj: projectTuple) => ({
        label: proj.projectName,
        projectId: proj.projectId,
      }));

      quickPick.onDidChangeSelection(async ([item]) => {
        if (item) {
          await addThoughtFromQuickPick(item.projectId, selectedText);
          quickPick.dispose();
          // refresh view
          // vscode.commands
          //   .executeCommand('thoughtBubble.kill')
          //   .then(() => vscode.commands.executeCommand('thoughtBubble.start'));
          MainPanel.currentPanel?.refresh();
        }
      });
      // hides quickpicker is its closed without a selection
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
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
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
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
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
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
      (message) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(message.value);
            return;
          case 'getUser': {
            const userData = StateManager.getToken() || '';
            // vscode.window.showInformationMessage(userData);
            this._panel.webview.postMessage({ command: 'sendingData/refresh', userData }); // whole obj = event.data;
            return;
          }
          case 'logout':
            // this._panel.webview.postMessage({ command: 'sendingData', userData: null });
            // CLEAR SESSION
            StateManager.removeToken();
            // this._panel.webview
            return;
          case 'login':
            // execute login then post message to webview where redux store is updated
            vscode.commands.executeCommand('thoughtBubble.login').then(() => {
              this._panel.webview.postMessage({ command: 'sendingData/refresh', userData: StateManager.getToken() });
            });
            return;
          case 'refreshExt':
            // reload extension
            // used when you are already in the extension and you want to reload
            vscode.commands
              .executeCommand('thoughtBubble.kill')
              .then(() => vscode.commands.executeCommand('thoughtBubble.start'));
        }
      },
      null,
      this._disposables
    );
  }

  public refresh() {
    // used to "background refresh" the view i.e. you used the "add thought" command while in a js file...
    // and you want it to show up in you thoughtBubble tab without having to refresh next time you open
    // note: this refresh is not needed if the thoughtBubble extension was not already open in a seperate tab
    this._panel.webview.postMessage({ command: 'sendingData/refresh', userData: StateManager.getToken() });
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
    const faviconMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'logo256.png');
    this._panel.iconPath = faviconMainPath;
    this._panel.title = 'thoughtBubble';
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Local path to main script run in the webview
    const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'reactBundle.js');
    // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

    // Local path to css styles
    const stylesMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'style.css');
    const stylesHomePath = vscode.Uri.joinPath(this._extensionUri, 'media', 'homePage.css');
    // Uri to load styles into webview
    const stylesMainUri = webview.asWebviewUri(stylesMainPath);
    const stylesHomeUri = webview.asWebviewUri(stylesHomePath);

    // Use a nonce to only allow specific scripts to be run;
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
          <meta http-equiv="Content-Security-Policy" content="style-src https: 'unsafe-inline' ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}' https: 'unsafe-inline';">
				-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="${stylesMainUri}">
				<link rel="stylesheet" href="${stylesHomeUri}">
				<script nonce="${nonce}">
					const vscodeGlobal = acquireVsCodeApi();
				</script>
			</head>
			<body>
        <!-- <ion-icon name="heart"></ion-icon> -->
				<div id="root"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
