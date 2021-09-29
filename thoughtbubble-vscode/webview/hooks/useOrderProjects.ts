// import { useSelector } from "react-redux";
// import { ProjectShape } from "../interfaces/interfaces";
// import { RootState } from "../reducers/rootReducer";

// export const useOrderProjects = function (): ProjectShape[] {
//   const userInfoData = useSelector((state: RootState) => state.userInfo);
//   let userProjectsData = useSelector((state: RootState) => state.userProjectData);
//   if (userProjectsData.length <= 1) return userProjectsData;
//   const { projectDirection, projectOrder } = userInfoData;
//   // collect pins and sort by pin date (lates pin at top)
//   const pins = userProjectsData.filter((proj) => proj.pinned).sort((a, b) => b.pinDate.localeCompare(a.pinDate));
//   // remove pins
//   userProjectsData = userProjectsData.filter((i) => !i.pinned);

//   if (projectOrder === OrderTypes.LAST_UPDATED) {
//     // sort by last update (api returns this by default)
//     userProjectsData = [...userProjectsData.sort((a, b) => b.lastUpdatedDate.localeCompare(a.lastUpdatedDate))]; // oldest at top: ;
//   } else if (projectOrder === OrderTypes.ALPHABETICAL) {
//     // sort projects alphabetically
//     userProjectsData = [...userProjectsData.sort((a, b) => a.projectName.localeCompare(b.projectName))];
//   } else {
//     // sort projects by size (number or thoughts in them)
//     userProjectsData = [...userProjectsData.sort((a, b) => b.projectThoughts.length - a.projectThoughts.length)];
//   }
//   // format in ascending or descending order, + add pins to front
//   return projectDirection === Directions.ASC
//     ? [...pins, ...userProjectsData.reverse()]
//     : [...pins, ...userProjectsData];
// };
