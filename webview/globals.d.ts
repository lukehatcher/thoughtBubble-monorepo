import * as _vscode from 'vscode';

declare global {
	const vscodeGlobal: {
		postMessage: ({ command: string, value: any}) => void;
		getState: () => any;
		setState: (state: any) => void;
	}
}
// const vscodeGlobal: {postMessage: ({ command: string, value: any}) => void}
