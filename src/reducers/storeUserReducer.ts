const initialState = null;

export const storeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'storeUser/set':
      return action.payload;
    default:
      return state;
  }
};
