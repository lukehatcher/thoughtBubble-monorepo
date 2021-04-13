const initialState = [];

interface userData {
  _id: string;
  projectName: string;
  todos: any[];
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

export const UserDataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'fetchData':
      console.log(payload, 'payload');
      return payload;
    case 'addProject':
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
    case 'addThought':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: [
              ...item.todos,
              { _id: payload._id, text: payload.thought, completed: false }, //
            ],
          };
        }
      });
    case 'deleteThought':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.filter((thought) => thought._id !== payload._id),
          };
        }
      });
    case 'thoughtStatusChange':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.map((thought) => {
              if (thought._id === payload._id) {
                thought.completed = !thought.completed;
              }
              return thought;
            }),
          };
        }
      });
    case 'editThought':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.map((thought) => {
              if (thought._id === payload._id) {
                thought.text = payload.newThought;
              }
              return thought;
            }),
          };
        }
      });
    case 'filterData/completed':
      return payload.data.projects.map((project) => {
        if (project._id === payload.projectId) {
          return {
            ...project,
            todos: project.todos.filter((thought) => thought.completed),
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
            todos: project.todos.filter((thought) => !thought.completed),
          };
        } else {
          return project;
        }
      });
    default:
      return state;
  }
};
