import React, { FC, useRef, useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../reducers/rootReducer';
import { useSelector } from 'react-redux';
import { ExpandableListItem } from '../components/ExpandableListItem';
import { stylesLight } from './SettingsScreen';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';

const { darkMode, lightMode } = colors;

interface ArchiveScreenProps {}

export const ArchiveScreen: FC<ArchiveScreenProps> = function () {
  const userArchiveData = useSelector((state: RootState) => state.archive);
  const [showTitle, setShowTitle] = useState(false);
  const isDarkMode = useDarkCheck();
  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };

  // ============================== + showTitle useState
  const scrollY = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current; // for the fading in small title
  const translation = scrollY.interpolate({
    inputRange: [10, 130], // wayyy smoother start from 10 than from 100
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    // for the big title
    inputRange: [10, 130],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const borderOpacity = scrollY.interpolate({
    // for the bottom header border
    inputRange: [10, 130],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY, // "state" variable
          },
        },
      },
    ],
    { useNativeDriver: true },
  );

  useEffect(() => {
    Animated.timing(animationOpacity, {
      toValue: showTitle ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animationOpacity, showTitle]);

  useEffect(() => {
    const listener = scrollY?.addListener(({ value }) => {
      setShowTitle(value > 130);
    });

    return () => {
      scrollY?.removeListener(listener);
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Animated.View // header
          style={[
            headerStyles.header,
            {
              backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
              transform: [{ translateY: translation }],
            },
          ]}
        >
          {/* main title container view */}
          <Animated.View style={[headerStyles.titleContainer, { opacity: titleOpacity }]}>
            <MaterialCommunityIcons
              name="thought-bubble"
              size={30}
              color={isDarkMode ? darkMode.primary : lightMode.primary}
            />
            <Text style={{ fontSize: 30, color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground }}>
              Archive
            </Text>
          </Animated.View>
          <Animated.Text
            style={[
              headerStyles.animationText,
              { opacity: animationOpacity, color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground },
            ]}
          >
            Archive
          </Animated.Text>
          <Animated.View
            style={[
              headerStyles.bottomBorder,
              { backgroundColor: isDarkMode ? darkMode.background : '#EEE', opacity: borderOpacity },
            ]}
          ></Animated.View>
        </Animated.View>
        {/* if theres no archived projects, show placeholder icon */}
        {userArchiveData.length ? (
          <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={1} contentContainerStyle={{ flexGrow: 1 }}>
            <TopPaddingView />
            {userArchiveData.map((proj, _index) => {
              return (
                <ExpandableListItem
                  key={proj.id}
                  projectId={proj.id}
                  projectName={proj.projectName}
                  projectThoughts={proj.projectThoughts}
                />
              );
            })}
            {/* 
          1.) LayoutAnimation fade-in of text beats the view slide down and covers whatever is below
          unless a View(s) of equal height is below it. To fix this the BottomPaddingView has a height of 100% and
          `contentContainerStyle={{ flexGrow: 1 }}` was added to the parent Animated.ScrollView.
          2.) min-height of 80px is left to keep scrollview content above nav tab bar, same as all other screens 
          */}
            <BottomPaddingView />
          </Animated.ScrollView>
        ) : (
          <EmptyPlaceholder isDarkMode={isDarkMode} theme={theme} />
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const BottomPaddingView = styled.View`
  min-height: 80px;
  height: 100%;
  background-color: ${(props) => props.theme.background};
`;

const TopPaddingView = styled.View`
  height: 130px;
`;

const headerStyles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 9,
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  animationText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 10,
  },
});
