import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActivityActionTypes, ArchiveActionTypes } from '../constants/actionTypes';
import { RootState } from '../reducers/rootReducer';
import { ProjectShape } from './data';

// reusable thunk typing
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

// === activity reducer ===
export interface ActivityReducerAction {
  type: ActivityActionTypes; // enum
  payload: ActivityData[];
}

export interface Point {
  x: number;
  y: number;
}

export interface ActivityData {
  activityDate: string;
  id: string;
  projectId: string;
  userId: string;
}

export interface Activity {
  // return
  data: ActivityData[];
  graphData: Point[]; // data or all projects
  graphDataPerProject: { [key: string]: Point[] };
}

// === activity reducer ===
export interface ArchiveReducerAction {
  type: ArchiveActionTypes;
  payload: ProjectShape[] | ProjectShape | string;
}
