import * as vscode from 'vscode';
import axios from 'axios';
import { StateManager } from './stateManager';
import { ProjectShape, projectTuple } from './interfaces';

export const BASE_URL = 'http://localhost:3001';

export const fetchQuickPickData = async (): Promise<null | projectTuple[]> => {
  const token = StateManager.getToken();
  if (!token) return null;
  try {
    const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
    const userData: ProjectShape[] = response.data;
    return userData.map((proj) => ({ projectName: proj.projectName, projectId: proj.id }));
  } catch (err) {
    vscode.window.showErrorMessage(JSON.stringify(err));
    return null; // ts needs this
  }
};

export const addThoughtFromQuickPick = async (projectId: string, newThought: string): Promise<void> => {
  const token = StateManager.getToken();
  if (!token) {
    vscode.window.showErrorMessage('must be logged in to add thought');
    return;
  }

  try {
    await axios.post(
      `${BASE_URL}/thoughts`,
      {
        projectId,
        thought: newThought,
        creationLocation: 'vscode',
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (err) {
    vscode.window.showErrorMessage(JSON.stringify(err));
  }
};
