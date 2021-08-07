import React from 'react';
import { View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from 'react-native-paper';
import styled, { ThemeProvider } from 'styled-components/native';
import { RootState } from '../reducers/rootReducer';
import { _logout } from '../utils/auth';
import { SettingsScreenProps } from '../interfaces/screenProps';
import { changeEmailSettingsAction, changeDarkModeAction } from '../actions/userInfoActions';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { styleOptions3 } from '../interfaces/stringLiteralTypes';

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.userInfo);
  const dailyEmailSetting = useSelector((state: RootState) => state.userInfo.dailyEmail);
  const weeklyEmailSetting = useSelector((state: RootState) => state.userInfo.weeklyEmail);
  const isDarkMode = useDarkCheck();

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    textOnSurface: isDarkMode ? darkMode.textOnSurface : lightMode.textOnSurface,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
    cardHeader: isDarkMode ? darkMode.secondary : lightMode.primary,
  };

  const handleEmailSettingToggle = function (emailSetting: string): void {
    if (emailSetting === 'daily') dispatch(changeEmailSettingsAction('daily'));
    else dispatch(changeEmailSettingsAction('weekly'));
  };

  const handleDarkModeToggle = function (): void {
    dispatch(changeDarkModeAction());
  };

  const useTheme = (name: styleOptions3) => (isDarkMode ? stylesDark[name] : stylesLight[name]);

  return (
    <ThemeProvider theme={theme}>
      <View style={useTheme('topView')}></View>
      <View style={useTheme('middleView')}>
        <HeaderText>Settings</HeaderText>
      </View>

      <View style={useTheme('bottomContainer')}>
        <View style={useTheme('userPicPlusInfo')}>
          <Image source={{ uri: user.avatarUrl }} style={useTheme('img')} />
          <NameEmailContainer>
            <NameText>{user.displayName}</NameText>
            <EmailText>{user.email}</EmailText>
          </NameEmailContainer>
        </View>

        <SectionLabel>notifications</SectionLabel>
        <View style={useTheme('emailSettingsContainer')}>
          <View style={useTheme('emailSettingsItem')}>
            <ItemText>daily emails</ItemText>
            <Switch
              value={dailyEmailSetting}
              onValueChange={() => handleEmailSettingToggle('daily')}
              style={stylesShared.toggle}
            />
          </View>
          <View style={useTheme('emailSettingsItem')}>
            <ItemText>weekly emails </ItemText>
            <Switch
              value={weeklyEmailSetting}
              onValueChange={() => handleEmailSettingToggle('weekly')}
              style={stylesShared.toggle}
            />
          </View>
        </View>

        <SectionLabel>theme</SectionLabel>
        <View style={useTheme('settingItemTheme')}>
          <ItemText>Dark Theme</ItemText>
          <Switch value={isDarkMode} onValueChange={() => handleDarkModeToggle()} style={stylesShared.toggle} />
        </View>
        <TouchableOpacity style={useTheme('logoutBtn')}>
          <Button title="Logout" onPress={_logout} color={isDarkMode ? darkMode.onError : lightMode.onError} />
        </TouchableOpacity>
      </View>
    </ThemeProvider>
  );
};

const HeaderText = styled.Text`
  font-family: Inter;
  color: ${(props) => props.theme.textOnBackground};
  font-size: 25px;
`;

const stylesShared = StyleSheet.create({
  toggle: {
    marginRight: 7.5,
    marginLeft: 'auto',
  },
});

const NameText = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.textOnSurface};
  font-size: 17px;
  font-family: Inter;
`;

const EmailText = styled.Text`
  /* color: ${(props) => props.theme.textOnSurface}; */
  color: #808080;
  font-size: 15px;
  font-family: Inter;
`;

const SectionLabel = styled.Text`
  margin-left: 10px;
  font-family: Inter;
  font-size: 18px;
  color: ${(props) => props.theme.primary};
`;

const ItemText = styled.Text`
  color: ${(props) => props.theme.textOnSurface};
  font-size: 15px;
  font-family: Inter;
`;

const NameEmailContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
`;

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
    fontFamily: 'Inter',
    color: darkMode.primary,
    fontSize: 25,
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
  logoutBtn: {
    color: lightMode.onError,
    backgroundColor: lightMode.error,
    borderRadius: 15,
    padding: 6,
    marginHorizontal: 70,
    marginTop: 25,
  },
});
