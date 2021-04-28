interface ProjectFilters {
  id: string;
  status: 'all' | 'completed' | 'incomplete';
  tags: string[];
}

const initialState: ProjectFilters[] = [];

// need to initialize all projects, add project, delete project

export const filterReducer = (state = initialState, action): ProjectFilters[] => {
  switch (action.type) {
    case 'changeFilter':
      return {
        ...state,
        // etc
      };
    default:
      return state;
  }
};
