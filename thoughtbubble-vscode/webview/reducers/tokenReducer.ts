const initialState = null;

export const tokenReducer = (state = initialState, action): string | null => {
  switch (action.type) {
    case 'token/save':
      return action.payload;
    default:
      return state;
  }
};
