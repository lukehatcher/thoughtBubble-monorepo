interface UserInfoShape {
  id: string;
  email: string;
  username: string;
  githubId: string;
  dailyEmail: boolean;
}

// data pertaining to a specific user from the User entity table

const initialState: UserInfoShape = {
  id: '',
  email: '',
  username: '',
  githubId: '',
  dailyEmail: true,
};

export const userInfoReducer = (state = initialState, action): UserInfoShape => {
  switch (action.type) {
    case 'fetchUserInfo':
      return action.payload;
    case 'toggleDailyEmail':
      return {
        ...state,
        dailyEmail: !state.dailyEmail,
      };
    default:
      return state;
  }
};
