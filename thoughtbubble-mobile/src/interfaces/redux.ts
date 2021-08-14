import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActivityActionTypes, ArchiveActionTypes, UserInfoActionTypes } from '../constants/actionTypes';
import { RootState } from '../reducers/rootReducer';
import { ProjectShape, UserInfoShape } from './data';
import { FilterActionTypes } from '../constants/actionTypes';
import { StatusFilters, Tags } from './stringLiteralTypes';
import { Directions, OrderTypes } from '../constants/orders';

// reusable thunk typing
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

// used to make sure user token/info has loaded before rendering things on App.tsx
export enum UserInfoLoadingStatus {
  IDLE = 'idle',
  COMPLETED = 'completed',
}

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

// === archive reducer ===
export interface ArchiveReducerAction {
  type: ArchiveActionTypes;
  payload: ProjectShape[] | ProjectShape | string;
}

// === filter reducer ===
export interface FilterReducerAction {
  type: FilterActionTypes;
  payload: ProjectShape[] | ProjectShape | string | { typeOfFilter: string; projectId: string };
}

export interface FilterReducerInitialState {
  id: string;
  status: StatusFilters;
  tags: Tags[];
}

// userInfo reducer
export interface UserInfoAction {
  type: UserInfoActionTypes;
  payload: UserInfoShape | Directions | OrderTypes;
}
