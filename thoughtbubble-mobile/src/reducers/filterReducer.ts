// interface ColorFilters {
//   red: 'red';
//   orange: 'orange';
//   green: 'green';
//   blue: 'blue';
//   purple: 'purple';
//   star: 'star';
// }

// export const StatusFilters = {
//   all: 'all',
//   completed: 'completed',
//   incomplete: 'incomplete',
// };

// interface Filters {
//   status: string;
//   colors: string[];
// }

// const initialState: Filters = {
//   status: 'all',
//   colors: [],
// };

// export const filterReducer = (state = initialState, action): Filters => {
//   switch (action.type) {
//     case 'changeFilter':
//       return {
//         ...state,
//         // toggle boolean for type specified in payload
//       };
//     default:
//       return state;
//   }
// };

// // ================
