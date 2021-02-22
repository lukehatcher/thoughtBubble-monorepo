const initialState = []; // array of objs, where each obj has todos arry of objs
// https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose/47002504

interface userData {
  _id: string;
  projectName: string;
  todos: any[];
  key?: string; // https://github.com/jemise111/react-native-swipe-list-view#usage
}

export const UserDataReducer = (state = initialState, action): userData[] => {
  const { type, payload } = action; // need to add destructuring in other files
  switch (type) {
    case 'fetchData':
      return payload.projects;
    case 'addProject':
      return [
        ...state,
        {
          _id: Math.random(), // should match db id!!!!!!!
          projectName: payload,
          todos: [],
        },
      ];
    case 'deleteProject':
      return state.filter((i) => i.projectName !== payload);
    case 'addTodo':
      // looks complicated cause we need to copy each level!
      return state.map((item) => {
        if (item.projectName !== payload.projectName) {
          return { ...item };
        } else {
          return {
            ...item,
            todos: [
              ...item.todos,
              { _id: Math.random(), text: payload.todo, completed: false }, // wrong id
            ],
          };
        }
      });
    case 'deleteTodo':
      return state.map((item) => {
        if (item.projectName !== payload.projectName) {
          return { ...item };
        } else {
          return {
            ...item,
            todos: item.todos.filter((todo) => todo.text !== payload.todo),
          };
        }
      });
    case 'todoStatusChange':
      return state.map((item) => {
        if (item.projectName !== payload.projectName) {
          return { ...item };
        } else {
          return {
            ...item,
            todos: item.todos.map((todo) => {
              if (todo.text === payload.todo) {
                todo.completed = !todo.completed;
              }
              return todo;
            }),
          };
        }
      });
    default:
      return state;
  }
};
