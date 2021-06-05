import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from 'react-native-paper';
import { RootState } from '../reducers/rootReducer';
import { _onLogOut } from '../utils/auth';
import { SettingsScreenProps } from '../interfaces/screenProps';
import { changeEmailSettingsAction, changeDarkModeAction } from '../actions/userInfoActions';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const dispatch = useDispatch();
  let idToken = useSelector((state: RootState) => state.storedUser);
  const dailyEmailSetting = useSelector((state: RootState) => state.userInfo.dailyEmail);
  const weeklyEmailSetting = useSelector((state: RootState) => state.userInfo.weeklyEmail);
  const isDarkMode = useDarkCheck();

  const handleEmailSettingToggle = function (emailSetting: string): void {
    if (emailSetting === 'daily') dispatch(changeEmailSettingsAction('daily'));
    else dispatch(changeEmailSettingsAction('weekly'));
  };

  const handleDarkModeToggle = function (): void {
    dispatch(changeDarkModeAction());
  };

  const useTheme = (name: string) => (isDarkMode ? stylesDark[name] : stylesLight[name]);

  return (
    <>
      <View style={useTheme('topView')}></View>
      <View style={useTheme('middleView')}>
        <Text style={useTheme('headerText')}>Settings</Text>
      </View>

      <View style={useTheme('bottomContainer')}>
        <View style={useTheme('userPicPlusInfo')}>
          <Image source={{ uri: idToken.picture }} style={useTheme('img')} />
          <View style={stylesDark.nameEmail}>
            <Text style={useTheme('text')}>{idToken.name}</Text>
            <Text style={useTheme('text')}>{idToken.email}</Text>
          </View>
        </View>

        <Text style={useTheme('textColor')}>notifications</Text>
        <View style={useTheme('emailSettingsContainer')}>
          <View style={useTheme('emailSettingsItem')}>
            <Text style={useTheme('text')}>daily emails</Text>
            <Switch
              value={dailyEmailSetting}
              onValueChange={() => handleEmailSettingToggle('daily')}
              style={stylesShared.toggle}
            />
          </View>
          <View style={useTheme('emailSettingsItem')}>
            <Text style={useTheme('text')}>weekly emails </Text>
            <Switch
              value={weeklyEmailSetting}
              onValueChange={() => handleEmailSettingToggle('weekly')}
              style={stylesShared.toggle}
            />
          </View>
        </View>

        <Text style={useTheme('textColor')}>theme</Text>
        <View style={useTheme('settingItemTheme')}>
          <Text style={useTheme('text')}>dark mode</Text>
          <Switch value={isDarkMode} onValueChange={() => handleDarkModeToggle()} style={stylesShared.toggle} />
        </View>
        <TouchableOpacity style={useTheme('logoutBtn')}>
          <Button
            title="logout"
            onPress={() => _onLogOut()}
            color={isDarkMode ? darkMode.onError : lightMode.onError}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const stylesShared = StyleSheet.create({
  toggle: {
    marginRight: 7.5,
    marginLeft: 'auto',
  },
});

// ==================== darkmode styles ====================

const stylesDark = StyleSheet.create({
  topView: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkMode.background,
  },
  middleView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkMode.dp1,
  },
  bottomContainer: {
    paddingTop: 25,
    flex: 2.75,
    backgroundColor: darkMode.background,
  },
  userPicPlusInfo: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    backgroundColor: darkMode.dp1,
    borderRadius: 6,
  },
  nameEmail: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 30,
  },
  emailSettingsContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: darkMode.dp1,
    borderRadius: 6,
  },
  emailSettingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingItemTheme: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: darkMode.dp1,
    borderRadius: 6,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  headerText: {
    color: darkMode.primary,
    fontSize: 25,
  },
  text: {
    color: darkMode.textOnSurface,
    fontSize: 15, // 14 default
  },
  textColor: {
    color: darkMode.primary,
    marginLeft: 10,
    fontSize: 20,
  },
  logoutBtn: {
    color: darkMode.onError,
    backgroundColor: darkMode.error,
    borderRadius: 15,
    padding: 6,
    marginHorizontal: 70,
    marginTop: 25,
  },
});

// ==================== lightmode styles ====================

const stylesLight = StyleSheet.create({
  topView: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightMode.primaryVariant, // #6200EE primary, #3700B3 primary variant
  },
  middleView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightMode.primary, // #6200EE primary, #3700B3 primary variant
  },
  bottomContainer: {
    paddingTop: 25,
    flex: 2.75,
    backgroundColor: lightMode.background,
  },
  userPicPlusInfo: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    backgroundColor: lightMode.background,
    borderRadius: 6,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  nameEmail: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 30,
  },
  emailSettingsContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: lightMode.background,
    borderRadius: 6,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  emailSettingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingItemTheme: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: lightMode.background,
    borderRadius: 6,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  headerText: {
    color: lightMode.textOnPrimary,
    fontSize: 25,
  },
  text: {
    color: lightMode.textOnSurface,
    fontSize: 15, // 14 default
  },
  textColor: {
    color: lightMode.primaryVariant,
    marginLeft: 10,
    fontSize: 20,
  },
  logoutBtn: {
    color: lightMode.onError,
    backgroundColor: lightMode.error,
    borderRadius: 15,
    padding: 6,
    marginHorizontal: 70,
    marginTop: 25,
  },
});
