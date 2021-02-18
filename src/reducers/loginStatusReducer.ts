const initialState = { status: false };

export function loginStatusReducer(state = initialState, action) {
  switch (action.type) {
    case 'loginStatus/change':
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
