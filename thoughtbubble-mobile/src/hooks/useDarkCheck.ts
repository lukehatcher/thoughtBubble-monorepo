import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

// retrieves whether or not the user has dark-mode enabled at that moment
export const useDarkCheck = function (): boolean {
  return useSelector((state: RootState) => state.userInfo.darkMode);
};
