const initialState = false;

export function loginStatusReducer(state = initialState, action): boolean {
  switch (action.type) {
    case 'loginStatus/change':
      return action.payload;
    default:
      return state;
  }
}
