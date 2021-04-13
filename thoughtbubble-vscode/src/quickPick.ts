import * as vscode from 'vscode';
import axios from 'axios';
import { StateManager } from './stateManager';
import { ProjectShape, projectTuple } from './interfaces';

export async function fetchQuickPickData(): Promise<null | projectTuple[]> {
  const userData = StateManager.getToken();
  if (!userData) return null;
  const userSub = `github|${JSON.parse(userData).id}`;
  try {
    const response = await axios.get('http://localhost:3001/api/projects', { params: { userSub } });
    const userData: ProjectShape[] = response.data;
    return userData.map((proj) => ({ projectName: proj.projectName, projectId: proj.id }));
  } catch (err) {
    vscode.window.showErrorMessage(JSON.stringify(err));
    return null; // ts needs this
  }
}

export async function addThoughtFromQuickPick(projectId: string, newThought: string) {
  const userData = StateManager.getToken() as string; // checking for undefined happened in fetchQuickPickData ^
  const userSub = `github|${JSON.parse(userData).id}`;
  try {
    await axios.post('http://localhost:3001/api/thoughts', {
      userSub,
      projectId,
      thought: newThought,
    });
  } catch (err) {
    vscode.window.showErrorMessage(JSON.stringify(err));
  }
}
