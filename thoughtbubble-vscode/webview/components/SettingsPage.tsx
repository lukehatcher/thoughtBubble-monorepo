import * as React from 'react';
// import { changeEmailSettingsAction } from '../actions/userInfoActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { routerLocations } from '../constants/routerLocations';
import { changeSaveOrderSettingAction } from '../actions/userInfoActions';
import { Directions, OrderTypes } from '../constants/orders';

// interface SettingsPageProps {}

export const SettingsPage: React.FC = function () {
  const dispatch = useDispatch();
  const dailyEmailSetting = useSelector((state: RootState) => state.userInfo.dailyEmail);
  const weeklyEmailSetting = useSelector((state: RootState) => state.userInfo.weeklyEmail);
  // ==========
  const saveOrderSetting = useSelector((state: RootState) => state.userInfo.saveOrder);
  const order = useSelector((state: RootState) => state.userInfo.projectOrder);
  const direction = useSelector((state: RootState) => state.userInfo.projectDirection);
  // ==========

  const handleEmailSettingToggle = function (emailSetting: string): void {
    // if (emailSetting === 'daily') dispatch(changeEmailSettingsAction('daily'));
    // else dispatch(changeEmailSettingsAction('weekly'));
  };

  const handleSwitchToggle = (): void => {
    if (saveOrderSetting) {
      // setting getting turned off
      dispatch(changeSaveOrderSettingAction(OrderTypes.LAST_UPDATED, Directions.DESC)); // defaults
      // reset db with defaults but keep local order and direction the same, just change the boolean
    } else {
      // setting getting turned on
      dispatch(changeSaveOrderSettingAction(order, direction));
      // update db with boolean and curr state and action will update local boolean
    }
  };

  return (
    <div>
      <h1>settings</h1>
      <Link to={routerLocations.PROJECTS}>return to projects</Link>
      <div className="toggle-container">
        <p>save project sort settings</p>
        <Switch
          checked={saveOrderSetting}
          onChange={handleSwitchToggle}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor="#121212"
          activeBoxShadow={'none'}
          height={21}
          width={42}
        />
      </div>
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
