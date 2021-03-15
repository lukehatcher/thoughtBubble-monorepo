import { GithubIdTokenShape } from "../interfaces/interfaces";

const initialState = null;

export const storeUserReducer = (state = initialState, action): GithubIdTokenShape | null => {
  switch (action.type) {
    case 'storeUser':
      return action.payload; // id prop is the one I want
    default:
      return state;
  }
};

// want to specify the return object later for typing
