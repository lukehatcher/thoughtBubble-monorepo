import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, LogBox, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, IconButton } from 'react-native-paper';
import styled, { ThemeProvider } from 'styled-components/native';

import { ProjectsScreenProps } from '../interfaces/componentProps'; // type
import { colors } from '../constants/colors';
import { AddProjectModal } from '../components/AddProjectModal';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { useOrderProjects } from '../hooks/useOrderProjects';
import { ProjectList } from '../components/ProjectList';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { ProjectDisplaySettingsModal } from '../components/ProjectDisplaySettingsModal';

const { darkMode, lightMode } = colors;

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const [addProjModalView, setAddProjModalView] = useState(false);
  const [projectSettingsModal, setProjectSettingsModal] = useState(false);
  const isDarkMode = useDarkCheck();
  let userProjectsData = useOrderProjects();

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

  const handleScroll = useCallback(
    Animated.event(
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
    ),
    [scrollY],
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

  const openProjectSettingsModal = useCallback(() => {
    setProjectSettingsModal(true);
  }, []);

  // for dev https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <ThemeProvider theme={theme}>
      {/* {console.log('project screen rerender')} */}
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
              size={40}
              color={isDarkMode ? darkMode.primary : lightMode.primary}
            />
            <HeaderTitleText>Projects</HeaderTitleText>
          </Animated.View>
          <Animated.Text
            style={[
              headerStyles.animationText,
              { opacity: animationOpacity, color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground },
            ]}
          >
            Projects
          </Animated.Text>
          <IconButton
            icon="tune"
            onPress={() => openProjectSettingsModal()}
            size={30}
            color={isDarkMode ? darkMode.secondary : lightMode.textOnSurface}
            style={styles.tuneIcon}
          />
          <Animated.View
            style={[
              headerStyles.bottomBorder,
              { backgroundColor: isDarkMode ? darkMode.background : '#EEE', opacity: borderOpacity },
            ]}
          ></Animated.View>
        </Animated.View>
        {userProjectsData.length ? (
          <ProjectList userProjectsData={userProjectsData} handleScroll={handleScroll} isDarkMode={isDarkMode} />
        ) : (
          // if user has no projects, this message + icon pops up
          <EmptyPlaceholder isDarkMode={isDarkMode} theme={theme} />
        )}
      </MainContainer>
      <AddProjectModal addProjModalView={addProjModalView} setAddProjModalView={setAddProjModalView} />
      <ProjectDisplaySettingsModal modalVisible={projectSettingsModal} setModalVisible={setProjectSettingsModal} />
      <FAB style={styles.fab} icon="plus" onPress={() => setAddProjModalView(true)} label="new project" />
    </ThemeProvider>
  );
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const HeaderTitleText = styled.Text`
  font-size: 22px;
  color: ${(props) => props.theme.textOnBackground};
  margin-left: 15px;
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
    marginLeft: 30,
  },
  animationText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 10,
  },
});

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 80,
    margin: 16,
  },
  tuneIcon: {
    position: 'absolute',
    bottom: -5,
    right: 10,
    borderRadius: 10,
    width: 35,
    height: 35,
  },
});
