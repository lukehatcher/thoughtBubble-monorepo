const initialState = []; // array of objs, where each obj has todos arry of objs
// https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose/47002504

interface userDataShape {
  _id: string;
  projectName: string;
  todos: any[];
}

export const UserDataReducer = (state = initialState, action): userDataShape[] => {
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
    case 'addTodo':
      // looks commplicated cause we need to copy each level!
      return state.map((item) => {
        if (item.projectName !== action.payload.projectName) {
          return { ...item };
        } else {
          return {
            ...item,
            todos: [
              ...item.todos,
              { _id: Math.random(), text: action.payload.todo, completed: false }, // wrong id
            ],
          };
        }
      });
    // console.log(newState);
    // return newState;
    default:
      return state;
  }
};
