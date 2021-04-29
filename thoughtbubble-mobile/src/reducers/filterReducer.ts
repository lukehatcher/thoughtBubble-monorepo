interface ProjectFilters {
  id: string;
  status: 'all' | 'completed' | 'incomplete';
  tags: string[];
}

const initialState: ProjectFilters[] = [];

// need to initialize all projects, add project, delete project
//
// changing of filter data done in the SortThoughtModal file
export const filterReducer = (state = initialState, action): ProjectFilters[] => {
  switch (action.type) {
    // the handleThoughtFilter function controls filter data mutation
    case 'addRemoveFilter':
      console.log(action.payload);
      return action.payload;
    case 'initProjectFilters': {
      const data = action.payload;
      const newState = [];
      for (let i = 0; i < data.length; i++) {
        newState.push({ id: data[i].id, status: 'all', tags: [] });
      }
      return newState;
    }
    default:
      return state;
  }
};
