interface Filters {
  completed: boolean;
  incomplete: boolean;
  all: boolean;
  red: boolean;
  orange: boolean;
  green: boolean;
  blue: boolean;
  purple: boolean;
  star: boolean;
}

const initialState: Filters = {
  completed: false,
  incomplete: false,
  all: false,
  red: false,
  orange: false,
  green: false,
  blue: false,
  purple: false,
  star: false,
};

export const filterReducer = (state = initialState, action): Filters => {
  switch (action.type) {
    case 'changeFilter':
      return {
        ...state,
        // toggle boolean for type specified in payload
      };
    default:
      return state;
  }
};
