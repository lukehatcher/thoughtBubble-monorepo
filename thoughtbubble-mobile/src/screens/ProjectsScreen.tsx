import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';
import { RootState } from '../reducers/rootReducer'; // type
import { ProjectsScreenProps } from '../interfaces/componentProps'; // type
import { deleteProjectAction } from '../actions/projectActions';
import { colors } from '../constants/colors';
import { AddProjectModal } from '../components/AddProjectModal';
import { useDarkCheck } from '../hooks/useDarkCheck';
import styled, { ThemeProvider } from 'styled-components/native';
import { ProjectList } from '../components/ProjectList';

const ProjectListMemo = memo(ProjectList);

const { darkMode, lightMode } = colors;
const data = [];
for (let i = 0; i < 5; i++) data.push(Math.random());

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const [addProjModalView, setAddProjModalView] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();
  let userProjectsData = useSelector((state: RootState) => state.userProjectData);

  const useTheme = (name: string) => (isDarkMode ? stylesDark[name] : stylesLight[name]);
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
  const scrolling = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current; // for the fading in small title
  const translation = scrolling.interpolate({
    inputRange: [10, 130], // wayyy smoother start from 10 than from 100
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrolling.interpolate({
    // for the big title
    inputRange: [10, 130],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const borderOpacity = scrolling.interpolate({
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
    const listener = scrolling?.addListener(({ value }) => {
      setShowTitle(value > 130);
    });

    return () => {
      scrolling?.removeListener(listener);
    };
  });

  // const handleProjectDeletion = function (projectId: string) {
  //   dispatch(deleteProjectAction(projectId));
  // };

  // const closeRow = (rowMap, rowKey) => {
  //   // for slidables
  //   if (rowMap[rowKey]) {
  //     rowMap[rowKey].closeRow();
  //   }
  // };

  // const renderItem = (data) => (
  //   // for slidables
  //   <TouchableHighlight
  //     onPress={() => navigation.navigate('Thoughts', { projectId: data.item.id })}
  //     style={useTheme('rowFront')}
  //     underlayColor={'grey'}
  //   >
  //     <View style={sharedStyles.chevronContainer}>
  //       <TextStyled>{data.item.projectName}</TextStyled>
  //       <MaterialCommunityIcons
  //         name="chevron-right"
  //         size={40}
  //         color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
  //       />
  //     </View>
  //   </TouchableHighlight>
  // );

  // const renderHiddenItem = (data, _rowMap) => (
  //   // for slidables
  //   <View
  //     style={{
  //       ...useTheme('rowFront'),
  //       backgroundColor: isDarkMode ? colors.darkMode.error : colors.lightMode.error,
  //     }}
  //   >
  //     {/* to match height of back view to the dynamic front view height,
  //     add random view below with same text (but invisable) to get same height */}
  //     <View>
  //       {console.log('hihihi')}
  //       <Text style={useTheme('hiddenBackText')}>{data.item.projectName}</Text>
  //     </View>
  //     <TouchableOpacity
  //       style={[useTheme('backRightBtn'), useTheme('backRightBtnRight')]}
  //       onPress={() => handleProjectDeletion(data.item.id)}
  //     >
  //       <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
  //     </TouchableOpacity>
  //   </View>
  // );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  // let SwipeListViewAnimated = Animated.createAnimatedComponent(SwipeListView);
  // SwipeListViewAnimated = React.memo(SwipeListViewAnimated);

  // const ProjectListAnimated = Animated.createAnimatedComponent(ProjectListMemo);

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrolling, // "state" variable
          },
        },
      },
    ],
    { useNativeDriver: true },
  );

  return (
    <ThemeProvider theme={theme}>
      {console.log('rerender D:')}
      <MainContainer>
        <Animated.View // header
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 120,
            backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
            transform: [{ translateY: translation }],
            zIndex: 9,
          }}
        >
          <Animated.View // big title + cloud container
            style={{
              opacity: titleOpacity,
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 10,
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="thought-bubble"
              size={30}
              color={isDarkMode ? darkMode.primary : lightMode.primary}
            />
            <Text style={{ fontSize: 30, color: isDarkMode ? 'white' : 'black' }}>Projects</Text>
          </Animated.View>
          <Animated.Text
            style={[
              styles.animationText,
              { opacity: animationOpacity, color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground },
            ]}
          >
            Projects
          </Animated.Text>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 0.5,
              width: '100%',
              backgroundColor: isDarkMode ? 'white' : 'black',
              opacity: borderOpacity,
            }}
          ></Animated.View>
        </Animated.View>
        {/* ============================================== */}
        {userProjectsData.length ? (
          // <SwipeListViewAnimated
          //   data={userProjectsData.map((i) => ({ ...i, key: i.id }))} // swipeviewlist api requires key prop
          //   renderItem={renderItem}
          //   renderHiddenItem={renderHiddenItem}
          //   recalculateHiddenLayout
          //   disableRightSwipe
          //   closeOnScroll
          //   closeOnRowBeginSwipe
          //   closeOnRowPress
          //   rightOpenValue={-150}
          //   previewOpenValue={-40}
          //   // ==============================================
          // onScroll={Animated.event(
          //   [
          //     {
          //       nativeEvent: {
          //         contentOffset: {
          //           y: scrolling, // "state" variable
          //         },
          //       },
          //     },
          //   ],
          //   { useNativeDriver: true },
          // )}
          // scrollEventThrottle={4}
          // style={{ flex: 1, paddingTop: 130 }}
          // />
          <>
            <ProjectListMemo
              userProjectsData={userProjectsData}
              handleScroll={handleScroll}
              // scrollEventThrottle={4}
            />
          </>
        ) : (
          // </Animated.View>
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

const TextStyled = styled.Text`
  font-size: 20px;
  flex: 1;
  padding: 15px;
  color: ${(props) => props.theme.textOnSurface};
`;

const styles = StyleSheet.create({
  animationText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 10,
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
    // backgroundColor: 'grey',
  },
});

const stylesDark = StyleSheet.create({
  rowFront: {
    backgroundColor: colors.darkMode.dp1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
    marginTop: 15,
    marginHorizontal: 10,
    flexWrap: 'wrap',
    borderRadius: 10,
  },
  backRightBtn: {
    position: 'absolute',
    paddingRight: 20,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 155,
  },
  backRightBtnRight: {
    // change colors to see why all these styles are necesary
    backgroundColor: colors.darkMode.error,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  hiddenBackText: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
});

const stylesLight = StyleSheet.create({
  rowFront: {
    backgroundColor: colors.lightMode.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
    marginTop: 15,
    marginHorizontal: 10,
    flexWrap: 'wrap',
    borderRadius: 10,
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
  backRightBtn: {
    position: 'absolute',
    paddingRight: 20,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 155,
  },
  backRightBtnRight: {
    backgroundColor: colors.lightMode.error,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  hiddenBackText: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
});
