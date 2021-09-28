import * as React from 'react';
import { changeEmailSettingsAction } from '../actions/userInfoActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { routerLocations } from '../constants/routerLocations';

// interface SettingsPageProps {}

export const SettingsPage: React.FC = function () {
  const dispatch = useDispatch();
  const dailyEmailSetting = useSelector((state: RootState) => state.userInfo.dailyEmail);
  const weeklyEmailSetting = useSelector((state: RootState) => state.userInfo.weeklyEmail);

  const handleEmailSettingToggle = function (emailSetting: string): void {
    if (emailSetting === 'daily') dispatch(changeEmailSettingsAction('daily'));
    else dispatch(changeEmailSettingsAction('weekly'));
  };

  return (
    <div>
      <h1>settings</h1>
      <Link to={routerLocations.PROJECTS}>return to projects</Link>
      <div className="toggle-container">
        <p>daily emails</p>
        <Switch
          checked={dailyEmailSetting}
          onChange={() => handleEmailSettingToggle('daily')}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor="#121212"
          activeBoxShadow={'none'}
          height={21} // 28 default
          width={42} // 56 default
        />
      </div>
      <div className="toggle-container">
        <p>weekly emails</p>
        <Switch
          checked={weeklyEmailSetting}
          onChange={() => handleEmailSettingToggle('weekly')}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor="#121212"
          activeBoxShadow={'none'}
          height={21}
          width={42}
        />
      </div>
    </div>
  );
};
