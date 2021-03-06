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
      console.log(payload, 'payload');
      return payload.projects;
    case 'addProject': // id
      return [
        ...state,
        {
          _id: payload._id,
          projectName: payload.projectName,
          todos: [],
        },
      ];
    case 'deleteProject':
      console.log('filter about to run');
      return state.filter((projects) => projects._id !== payload);
    case 'addTodo':
      // looks complicated cause we need to copy each level
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: [
              ...item.todos,
              { _id: payload._id, text: payload.todo, completed: false }, //
            ],
          };
        }
      });
    case 'deleteTodo':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.filter((todo) => todo._id !== payload._id),
          };
        }
      });
    case 'todoStatusChange':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.map((todo) => {
              if (todo._id === payload._id) {
                todo.completed = !todo.completed;
              }
              return todo;
            }),
          };
        }
      });
    case 'editTodo':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.map((todo) => {
              if (todo._id === payload._id) {
                todo.text = payload.newThought;
              }
              return todo;
            }),
          };
        }
      });
    case 'filterData/completed':
      return payload.data.projects.map((project) => {
        if (project._id === payload.projectId) {
          return {
            ...project,
            todos: project.todos.filter((todo) => todo.completed),
          };
        } else {
          return project;
        }
      });
    case 'filterData/incomplete':
      return payload.data.projects.map((project) => {
        if (project._id === payload.projectId) {
          return {
            ...project,
            todos: project.todos.filter((todo) => !todo.completed),
          };
        } else {
          return project;
        }
      });
    default:
      return state;
  }
};
