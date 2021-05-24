import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';
import { RootState } from '../reducers/rootReducer'; // type
import { ProjectsScreenProps } from '../interfaces/componentProps'; // type
import { colors } from '../constants/colors';
import { AddProjectModal } from '../components/AddProjectModal';
import { useDarkCheck } from '../hooks/useDarkCheck';
import styled, { ThemeProvider } from 'styled-components/native';
import { ProjectList } from '../components/ProjectList';
import { stylesDark } from './SettingsScreen';
import { Background } from 'victory-core';

const ProjectListMemo = memo(ProjectList);

const { darkMode, lightMode } = colors;
const data = [];
for (let i = 0; i < 5; i++) data.push(Math.random());

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const [addProjModalView, setAddProjModalView] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();
  let userProjectsData = useSelector((state: RootState) => state.userProjectData);

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    textOnSurface: isDarkMode ? darkMode.textOnSurface : lightMode.textOnSurface,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };

  const [showTitle, setShowTitle] = useState(false); // title to the left with the icon
  const scrollY = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current; // for the fading in small title

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

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

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
              Projects
            </Text>
          </Animated.View>
          <Animated.Text
            style={[
              sharedStyles.animationText,
              { opacity: animationOpacity, color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground },
            ]}
          >
            Projects
          </Animated.Text>
          <Animated.View
            style={[
              headerStyles.bottomBorder,
              { backgroundColor: isDarkMode ? 'white' : 'black', opacity: borderOpacity },
            ]}
          ></Animated.View>
        </Animated.View>
        {userProjectsData.length ? (
          <>
            {/* <Animated.View style={{ height: 120, backgroundColor: 'transparent' }} /> */}
            <ProjectListMemo userProjectsData={userProjectsData} handleScroll={handleScroll} isDarkMode={isDarkMode} />
          </>
        ) : (
          // if user has no projects, this message + icon pops up
          <View style={sharedStyles.nothingHere}>
            <MaterialCommunityIcons
              name="thought-bubble"
              size={125}
              color={isDarkMode ? `${colors.darkMode.textOnBackground}20` : `${colors.lightMode.textOnBackground}20`}
            />
            <TextNothingHere>oops, theres nothing to see here... yet</TextNothingHere>
          </View>
        )}
      </MainContainer>
      <AddProjectModal addProjModalView={addProjModalView} setAddProjModalView={setAddProjModalView} />
      <FAB style={sharedStyles.fab} icon="plus" onPress={() => setAddProjModalView(true)} label="new project" />
    </ThemeProvider>
  );
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const TextNothingHere = styled.Text`
  color: ${(props) => `${props.theme.textOnBackground}40`};
  font-size: 20px;
  margin-top: 20px;
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
    height: 0.5,
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
});

const sharedStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
  nothingHere: {
    marginTop: 75,
    flex: 1,
    alignItems: 'center',
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  animationText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 10,
  },
});
