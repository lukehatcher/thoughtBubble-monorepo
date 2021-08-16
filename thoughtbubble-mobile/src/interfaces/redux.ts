import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  ActivityActionTypes,
  ArchiveActionTypes,
  ProjectActionTypes,
  UserInfoActionTypes,
} from '../constants/actionTypes';
import { RootState } from '../reducers/rootReducer';
import { ProjectShape, ThoughtShape, UserInfoShape } from './data';
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

// userProjectData reducer
export interface UserProjectDataReducerAction extends Action {
  type: ProjectActionTypes;
  payload:
    | string
    | ProjectShape[]
    | ProjectShape
    | ThoughtShape
    | EditThoughtPayload
    | DeleteThoughtPayload
    | EditThoughtTagPayload
    | ToggleThoughtStatusPayload
    | FilterPayload;
}

export interface EditThoughtPayload extends Action {
  id: string;
  projectId: string;
  newThought: string;
}

export interface DeleteThoughtPayload extends Action {
  id: string;
  projectId: string;
}

export interface EditThoughtTagPayload extends Action {
  id: string;
  projectId: string;
  tag: Tags;
}

export interface ToggleThoughtStatusPayload extends Action {
  id: string;
  projectId: string;
}

export interface FilterPayload extends Action {
  data: ProjectShape[];
  projectId: string;
  filters: FilterReducerInitialState[];
}
