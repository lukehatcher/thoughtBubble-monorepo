import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FilterActionTypes } from '../constants/actionTypes';
import { Status } from '../constants/status';
import { Tags } from '../constants/tags';
import { RootState } from '../reducers/rootReducer';
import { ProjectShape } from './interfaces';

// reusable thunk typing
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

// for filterReducer
export interface FilterReducerInitialState {
  id: string;
  status: Status;
  tags: Tags[];
}

// TODO: change type of filter to Enum type
export interface FilterReducerAction extends Action {
  type: FilterActionTypes;
  payload: ProjectShape[] | ProjectShape | string | { typeOfFilter: string; projectId: string };
}
