interface UserInfoShape {
  // from query on User entity table
  id: string;
  email: string;
  username: string;
  githubId: string;
  dailyEmail: boolean;
  weeklyEmail: boolean;
  // darkMode: boolean;
}

const initialState: UserInfoShape = {
  id: '',
  email: '',
  username: '',
  githubId: '',
  dailyEmail: true,
  weeklyEmail: true,
  // darkMode: true,
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
    case 'toggleWeeklyEmail':
      return {
        ...state,
        weeklyEmail: !state.weeklyEmail,
      };
    case 'toggleDarkMode':
      return {
        ...state,
        // darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};
