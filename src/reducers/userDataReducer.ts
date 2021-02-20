const initialState = [];

export const UserDataReducer = (state = initialState, action): any[] => {
  switch (action.type) {
    case 'fetchData':
      return action.payload.projects;
    default:
      return state;
  }
};
