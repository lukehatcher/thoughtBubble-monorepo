type StatusFilters = 'all' | 'incomplete' | 'completed';
const statusFilters = ['all', 'incomplete', 'completed'];
const initialState: ProjectFilters[] = [];

interface ProjectFilters {
  id: string;
  status: StatusFilters;
  tags: string[];
}

export const filterReducer = (state = initialState, action): ProjectFilters[] => {
  switch (action.type) {
    case 'filters/initialize': {
      const data = action.payload;
      const newState = [];
      for (let i = 0; i < data.length; i++) {
        newState.push({ id: data[i].id, status: 'all', tags: [] });
      }
      return newState;
    }
    case 'filters/addProject':
      return [...state, { id: action.payload.id, status: 'all', tags: [] }];
    case 'filters/deleteProject':
      return state.filter((proj) => proj.id !== action.payload);
    case 'filters/update':
      const { typeOfFilter, projectId } = action.payload;

      if (statusFilters.includes(typeOfFilter)) {
        return state.map((proj) => {
          if (proj.id === projectId) {
            proj.status = typeOfFilter;
            return proj;
          } else {
            return proj;
          }
        });
      } else {
        return state.map((proj) => {
          if (proj.id === projectId) {
            if (proj.tags.includes(typeOfFilter)) {
              proj.tags = proj.tags.filter((tag) => tag !== typeOfFilter);
            } else {
              proj.tags.push(typeOfFilter);
            }
            return proj; // added or removed tag to proj
          } else {
            return proj; // untouched proj
          }
        });
      }
    case 'filters/clearTags':
      return state.map((proj) => {
        if (proj.id === action.payload) {
          proj.tags = [];
          return proj;
        } else {
          return proj;
        }
      });
    default:
      return state;
  }
};
