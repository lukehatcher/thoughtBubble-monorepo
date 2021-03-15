import { GithubIdTokenShape } from "../interfaces/interfaces";

const initialState = null;

export const storeUserReducer = (state = initialState, action): GithubIdTokenShape => {
  switch (action.type) {
    case 'storeUser':
			// console.log('actino.payload', JSON.parse(action.payload));
			console.log(action.payload);
      return action.payload; // id prop is the one I want
    default:
      return state;
  }
};

// want to specify the return object later for typing
