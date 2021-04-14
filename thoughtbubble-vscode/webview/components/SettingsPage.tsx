import * as React from 'react';
import { changeEmailSettingsAction } from '../actions/userInfoActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

// interface SettingsPageProps {}

export const SettingsPage: React.FC = function () {
  const dispatch = useDispatch();
  const selectEmailSetting = (state: RootState) => state.userInfo.dailyEmail;
  const dailyEmailSetting = useSelector(selectEmailSetting);

  const handleEmailSettingToggle = function () {
    dispatch(changeEmailSettingsAction());
  };

  return (
    <div>
      <h1>settings</h1>
      <h3>daily emails: {dailyEmailSetting ? 'currently on' : 'currently off'}</h3>
      <button type="button" onClick={() => handleEmailSettingToggle()}>
        {dailyEmailSetting ? 'opt-out' : 'opt-in'}
      </button>
    </div>
  );
};
