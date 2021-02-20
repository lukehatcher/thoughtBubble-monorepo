const initialState = []; // just the users projects

export const UserDataReducer = (state = initialState, action): any[] => {
  switch (action.type) {
    case 'fetchData':
      return action.payload.projects;
    case 'addProject':
      return [
        ...state,
        {
          _id: Math.random(), // needs to match db id!!!!!!!
          projectName: action.payload,
          todos: [],
        },
      ];
    case 'deleteProject':
      return state.filter((i) => i.projectName !== action.payload);
    default:
      return state;
  }
};
