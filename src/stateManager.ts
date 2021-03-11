
import * as vscode from "vscode";

export class StateManager {
  static globalState: vscode.Memento;

  static setToken(token: string) {
    return this.globalState.update('user', token);
  }

  static getToken(): string | undefined {
    return this.globalState.get('user');
  }

  static removeToken(): void {
    this.globalState.update('user', null);
  }
}