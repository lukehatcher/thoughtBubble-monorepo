import { useSelector } from 'react-redux';

import { Directions, OrderTypes } from '../constants/orders';
import { ProjectShape } from '../interfaces/data';
import { RootState } from '../reducers/rootReducer';

/**
 * fetch user's project data and order it in the way they have set i.e. alphabetically, date, etc
 */
export const useOrderProjects = function (): ProjectShape[] {
  const userInfoData = useSelector((state: RootState) => state.userInfo);
  let userProjectsData = useSelector((state: RootState) => state.userProjectData);
  if (userProjectsData.length <= 1) return userProjectsData;
  const { projectDirection, projectOrder } = userInfoData;

  if (projectOrder === OrderTypes.LAST_UPDATED) {
    // sort by last update (api returns this by default)
    userProjectsData = [...userProjectsData.sort((a, b) => a.lastUpdatedDate.localeCompare(b.lastUpdatedDate))]; // oldest at top
  } else if (projectOrder === OrderTypes.ALPHABETICAL) {
    // sort projects alphabetically
    userProjectsData = [...userProjectsData.sort((a, b) => b.projectName.localeCompare(a.projectName))];
  } else {
    // sort projects by size (number or thoughts in them)
    userProjectsData = [...userProjectsData.sort((a, b) => a.projectThoughts.length - b.projectThoughts.length)];
  }
  // format in ascending or descending order
  return projectDirection === Directions.ASC ? userProjectsData.reverse() : userProjectsData;
};
