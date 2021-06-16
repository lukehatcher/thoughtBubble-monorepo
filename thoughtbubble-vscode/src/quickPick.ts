import * as vscode from 'vscode';
import axios from 'axios';
import { StateManager } from './stateManager';
import { ProjectShape, projectTuple } from './interfaces';

export const BASE_URL = 'http://localhost:3001';
export const DEV_TOKEN = 'asdf1234';

export async function fetchQuickPickData(): Promise<null | projectTuple[]> {
  // const userData = StateManager.getToken();
  // if (!userData) return null;
  try {
    const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${DEV_TOKEN}` } });
    const userData: ProjectShape[] = response.data;
    return userData.map((proj) => ({ projectName: proj.projectName, projectId: proj.id }));
  } catch (err) {
    vscode.window.showErrorMessage(JSON.stringify(err));
    return null; // ts needs this
  }
}

export async function addThoughtFromQuickPick(projectId: string, newThought: string) {
  try {
    await axios.post(
      `${BASE_URL}/thoughts`,
      {
        projectId,
        thought: newThought,
        creationLocation: 'vscode',
      },
      { headers: { Authorization: `Bearer ${DEV_TOKEN}` } }
    );
  } catch (err) {
    vscode.window.showErrorMessage(JSON.stringify(err));
  }
}
