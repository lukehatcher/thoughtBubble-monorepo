import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image, Linking, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { darkMode, lightMode } from '../constants/colors';
import styled, { ThemeProvider } from 'styled-components/native';
import { Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeDarkModeAction } from '../actions/userInfoActions';
import { RootState } from '../reducers/rootReducer';

/**
 * drawer content
 */
export const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();
  const labelColor = isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground;
  const iconColor = isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground;
  const idToken = useSelector((state: RootState) => state.storedUser);

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
          <Image source={{ uri: idToken.picture }} style={styles.img} />
          <NameContainer>
            <NameText>{idToken.name}</NameText>
            <UsernameText>@{idToken.nickname}</UsernameText>
          </NameContainer>
        </ImageNameContainer>
        <LabelText>Navigation</LabelText>
        <DrawerItem
          label="Settings"
          labelStyle={{ color: labelColor }}
          icon={() => <MaterialCommunityIcons name="cog" size={30} color={iconColor} />}
          onPress={() => navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Projects"
          labelStyle={{ color: labelColor }}
          icon={() => <MaterialCommunityIcons name="format-list-bulleted" size={30} color={iconColor} />}
          onPress={() => navigation.navigate('Projects')}
        />
        <DrawerItem
          label="Archive"
          labelStyle={{ color: labelColor }}
          icon={() => <MaterialCommunityIcons name="archive" size={30} color={iconColor} />}
          onPress={() => navigation.navigate('Archive')}
        />
        <DrawerItem
          label="Stats"
          labelStyle={{ color: labelColor }}
          icon={() => <MaterialCommunityIcons name="equalizer" size={30} color={iconColor} />}
          onPress={() => navigation.navigate('Stats')}
        />

        <ThinBorder />
        <LabelText>Community</LabelText>
        <DrawerItem
          label="Discussion Board"
          labelStyle={{ color: labelColor }}
          icon={() => <MaterialCommunityIcons name="forum" size={30} color={iconColor} />}
          onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo/discussions')}
        />
        <DrawerItem
          label="Visit Repository"
          labelStyle={{ color: labelColor }}
          icon={() => <MaterialCommunityIcons name="github" size={30} color={iconColor} />}
          onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo')}
        />

        <ThinBorder />
        <LabelText>Preferences</LabelText>
        <DrawerItem
          label={() => (
            <Wrapper>
              <DarkThemeText>Dark Theme</DarkThemeText>
              <Switch value={isDarkMode} onValueChange={() => handleDarkModeToggle()} style={styles.switch} />
            </Wrapper>
          )}
          labelStyle={{ color: labelColor }}
          onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo')}
        />

        <ThinBorder />
      </DrawerContentScrollView>
      <DrawerItem
        style={styles.logout}
        label="Logout (not active)"
        labelStyle={{ color: isDarkMode ? darkMode.error : lightMode.error }}
        icon={() => (
          <MaterialCommunityIcons name="logout" size={30} color={isDarkMode ? darkMode.error : lightMode.error} />
        )}
        onPress={() => console.log('this should logout')}
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
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 1;
  color: ${(props) => props.theme.textOnBackground};
`;
const UsernameText = styled.Text`
  font-size: 14px;
  flex-shrink: 1;
  color: #808080;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DarkThemeText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
`;

const LabelText = styled.Text`
  color: #808080;
  margin-left: 15px;
  margin-bottom: 0px;
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
