import * as vscode from 'vscode';

const key = 'accessToken';

// creates a global reference to the state container + methods
export class StateManager {
  static globalState: vscode.Memento;

  public static setToken(token: string) {
    return this.globalState.update(key, token);
  }

  public static getToken(): string | undefined {
    return this.globalState.get(key);
  }

  public static removeToken(): void {
    this.globalState.update(key, null);
  }
}
