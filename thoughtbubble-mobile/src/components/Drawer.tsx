import React, { FC } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, Linking, StyleProp, StyleSheet, TextStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { darkMode, lightMode } from '../constants/colors';
import styled, { ThemeProvider } from 'styled-components/native';
import { Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeDarkModeAction } from '../actions/userInfoActions';
import { RootState } from '../reducers/rootReducer';
import { TextTB } from './Text';
import { _logout } from '../utils/auth';
import { DrawerContentProps } from '../interfaces/componentProps';

/**
 * custom drawer content
 */
export const DrawerContent: FC<DrawerContentProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();
  const user = useSelector((state: RootState) => state.userInfo);
  const iconColor = isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground;
  const itemStyle: StyleProp<TextStyle> = {
    color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
  };

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
    textOnError: isDarkMode ? darkMode.textOnError : lightMode.textOnError,
    error: isDarkMode ? darkMode.error : lightMode.error,
    borderColor: isDarkMode ? '#808080' : '#eee',
  };

  const handleDarkModeToggle = function (): void {
    // dup from settings screen
    dispatch(changeDarkModeAction());
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerContentScrollView>
        <ImageNameContainer>
          <Image source={{ uri: user.avatarUrl }} style={styles.img} />
          <NameContainer>
            <NameText>{user.displayName}</NameText>
            <UsernameText>@{user.username}</UsernameText>
          </NameContainer>
        </ImageNameContainer>
        <LabelText>Navigation</LabelText>
        <DrawerItem
          label="Settings"
          labelStyle={itemStyle}
          icon={() => <MaterialCommunityIcons name="cog" size={25} color={iconColor} />}
          onPress={() => navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Projects"
          labelStyle={itemStyle}
          icon={() => <MaterialCommunityIcons name="format-list-bulleted" size={25} color={iconColor} />}
          onPress={() => navigation.navigate('Projects')}
        />
        <DrawerItem
          label="Archive"
          labelStyle={itemStyle}
          icon={() => <MaterialCommunityIcons name="archive" size={25} color={iconColor} />}
          onPress={() => navigation.navigate('Archive')}
        />
        <DrawerItem
          label="Stats"
          labelStyle={itemStyle}
          icon={() => <MaterialCommunityIcons name="equalizer" size={25} color={iconColor} />}
          onPress={() => navigation.navigate('Stats')}
        />

        <ThinBorder />
        <LabelText>Community</LabelText>
        <DrawerItem
          label="Discussion Board"
          labelStyle={itemStyle}
          icon={() => <MaterialCommunityIcons name="forum" size={25} color={iconColor} />}
          onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo/discussions')}
        />
        <DrawerItem
          label="Visit Repository"
          labelStyle={itemStyle}
          icon={() => <MaterialCommunityIcons name="github" size={25} color={iconColor} />}
          onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo')}
        />

        <ThinBorder />
        <LabelText>Preferences</LabelText>
        <DrawerItem
          label={() => (
            <Wrapper>
              <TextTB style={{ color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground }}>
                Dark Theme
              </TextTB>
              <Switch value={isDarkMode} onValueChange={() => handleDarkModeToggle()} style={styles.switch} />
            </Wrapper>
          )}
          labelStyle={itemStyle}
          onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo')}
        />

        <ThinBorder />
      </DrawerContentScrollView>
      <DrawerItem
        style={styles.logout}
        label="Logout"
        labelStyle={[itemStyle, { color: isDarkMode ? darkMode.error : lightMode.error }]}
        icon={() => (
          <MaterialCommunityIcons name="logout" size={25} color={isDarkMode ? darkMode.error : lightMode.error} />
        )}
        onPress={_logout}
      />
    </ThemeProvider>
  );
};

const ImageNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const NameContainer = styled.View`
  flex-direction: column;
`;
const NameText = styled.Text`
  font-family: Inter;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 1;
  color: ${(props) => props.theme.textOnBackground};
`;
const UsernameText = styled.Text`
  font-family: Inter;
  font-size: 14px;
  flex-shrink: 1;
  color: #808080;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled.Text`
  color: #808080;
  margin-left: 15px;
  margin-bottom: 0px;
  font-family: Inter;
`;

const ThinBorder = styled.View`
  background-color: ${(props) => props.theme.borderColor};
  height: 1px;
  margin-bottom: 50px;
`;

const styles = StyleSheet.create({
  switch: {
    marginRight: -25,
    marginLeft: 'auto',
  },
  logout: {
    bottom: 25,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    margin: 20,
  },
});
