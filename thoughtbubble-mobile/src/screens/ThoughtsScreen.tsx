import React, { useState, FC, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, LogBox, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../reducers/rootReducer'; // type
import { deleteThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { MoreModal } from '../components/MoreModal';
import { ThoughtScreenProps } from '../interfaces/componentProps'; // type
import { darkMode, lightMode } from '../constants/colors';
import { SortThoughtModal } from '../components/SortThoughtModal';
import { AddThoughtModal } from '../components/AddThoughtModal';
import { FAB, IconButton } from 'react-native-paper';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StackBackButton } from '../components/StackBackButton';
import { ThoughtsList } from '../components/ThoughtsList';
import styled, { ThemeProvider } from 'styled-components/native';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import equal from 'deep-equal';

export const ThoughtsScreen: FC<ThoughtScreenProps> = ({ route, navigation }) => {
  const [addThoughtModalView, setAddThoughtModalView] = useState(false); // plus modal
  const [sortModalView, setSortModalView] = useState(false);
  const [moreModalView, setMoreModalView] = useState(false);
  const [focusedId, setFocusedId] = useState('');
  const dispatch = useDispatch();
  const { projectId } = route.params;
  const thoughtsSelector = (state: RootState) =>
    state.userProjectData.find((proj) => proj.id === projectId).projectThoughts;
  let thoughts = useSelector(thoughtsSelector, equal); // retrive thoughts for the project we're on

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

  const handleThoughtDelete = useCallback(
    (thoughtId: string) => {
      dispatch(deleteThoughtAction(projectId, thoughtId));
    },
    [projectId],
  );

  const handleThoughtStatusChange = useCallback(
    (thoughtId: string) => {
      dispatch(thoughtStatusChangeAction(projectId, thoughtId));
    },
    [projectId],
  );

  const renderModal = useCallback((thoughtId: string) => {
    setFocusedId(thoughtId);
    setMoreModalView(true);
  }, []);

  // for dev https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      {/* {console.log('thoughts screen rendered')} */}
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
                size={40}
                color={isDarkMode ? darkMode.primary : lightMode.primary}
              />
              <HeaderTitleText>Thoughts</HeaderTitleText>
            </Animated.View>
            <Animated.Text
              style={[
                headerStyles.animationText,
                {
                  opacity: animationOpacity,
                  color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
                },
              ]}
            >
              Thoughts
            </Animated.Text>
            {/* back button */}
            <View style={{ position: 'absolute', bottom: -9, right: 60 }}>
              <StackBackButton location="Projects" />
            </View>
            {/* sort modal button */}
            <IconButton
              icon="sort-variant"
              onPress={() => setSortModalView(true)}
              size={35}
              color={theme ? darkMode.primary : lightMode.textOnPrimary}
              style={styles.sortIcon}
            />
            <Animated.View
              style={[
                headerStyles.bottomBorder,
                { backgroundColor: isDarkMode ? darkMode.background : '#EEE', opacity: borderOpacity },
              ]}
            ></Animated.View>
          </Animated.View>
          {thoughts.length ? (
            <ThoughtsList
              isDarkMode={isDarkMode}
              thoughts={thoughts}
              renderModal={renderModal}
              handleThoughtStatusChange={handleThoughtStatusChange}
              handleThoughtDelete={handleThoughtDelete}
              handleScroll={handleScroll}
            />
          ) : (
            // if user has no thoughts in this proj, this message + icon pops up
            <EmptyPlaceholder isDarkMode={isDarkMode} theme={theme} />
          )}
        </MainContainer>
        {moreModalView ? (
          <MoreModal
            moreModalView={moreModalView}
            setMoreModalView={setMoreModalView}
            projectId={projectId}
            thoughtId={focusedId}
          />
        ) : (
          <></>
        )}
        <AddThoughtModal
          projectId={projectId}
          addThoughtModalView={addThoughtModalView}
          setAddThoughtModalView={setAddThoughtModalView}
        />
        <SortThoughtModal projectId={projectId} sortModalView={sortModalView} setSortModalView={setSortModalView} />
        <FAB style={styles.fab} icon="plus" onPress={() => setAddThoughtModalView(true)} label="new thought" />
      </ThemeProvider>
    </>
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
  sortIcon: {
    position: 'absolute',
    bottom: -5,
    right: 10,
    borderRadius: 10,
    width: 35,
    height: 35,
  },
});
