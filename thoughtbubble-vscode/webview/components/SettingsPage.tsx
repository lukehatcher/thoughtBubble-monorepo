import * as React from 'react';
import { changeEmailSettingsAction } from '../actions/emailActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

// interface SettingsPageProps {}

export const SettingsPage: React.FC = function () {
  const dispatch = useDispatch();
  // const selectEmailSetting = (state: RootState) => state

  const handleEmailSettingToggle = function () {
    dispatch(changeEmailSettingsAction);
  };

  return (
    <div>
      <p>this is the settings page</p>
      <button type="button" onClick={handleEmailSettingToggle}></button>
    </div>
  );
};
