import React, { useState, useLayoutEffect, FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../reducers/rootReducer'; // type
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { deleteThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { MoreModal } from '../components/MoreModal';
import { ThoughtScreenProps } from '../interfaces/componentProps'; // type
import { colors } from '../constants/colors';
import { SortThoughtModal } from '../components/SortThoughtModal';
import { AddThoughtModal } from '../components/AddThoughtModal';
import { FAB } from 'react-native-paper';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StackBackButton } from '../components/StackBackButton';
import { ThoughtsList } from '../components/ThoughtsList';
import styled, { ThemeProvider } from 'styled-components/native';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';

const { darkMode, lightMode } = colors;

export const ThoughtsScreen: FC<ThoughtScreenProps> = ({ route, navigation }) => {
  const [addThoughtModalView, setAddThoughtModalView] = useState(false); // plus modal
  const [sortModalView, setSortModalView] = useState(false);
  const [moreModalView, setMoreModalView] = useState(false);
  const [focusedId, setFocusedId] = useState('');
  const dispatch = useDispatch();
  const { projectId } = route.params;
  const thoughtsSelector = (state: RootState) =>
    state.userProjectData.find((proj) => proj.id === projectId).projectThoughts;
  let thoughts = useSelector(thoughtsSelector); // retrive thoughts for the project we're on

  const isDarkMode = useDarkCheck();
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

  // useLayoutEffect(() => {
  //   // adds the sort button to the stack header
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity style={{ marginRight: 30, marginBottom: 2 }} onPress={() => setSortModalView(true)}>
  //         <MaterialCommunityIcons
  //           name="sort-variant"
  //           size={40}
  //           color={theme ? colors.darkMode.primary : colors.lightMode.primary}
  //         />
  //       </TouchableOpacity>
  //     ),
  //     headerLeft: () => <StackBackButton location="Projects" />,
  //   });
  // }, [navigation, theme]);

  const handleThoughtDelete = (thoughtId: string) => {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtStatusChange = (thoughtId: string) => {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
    // closeRow(rowMap, rowKey); // move to thought list component
  };

  // const closeRow = (rowMap, rowKey) => {
  //   // for slidables
  //   if (rowMap[rowKey]) {
  //     rowMap[rowKey].closeRow();
  //   }
  // };

  // const renderHiddenItem = (data, rowMap) => (
  //   // for slidables
  //   <View
  //     style={{
  //       ...useTheme('rowFront'),
  //       backgroundColor: theme ? colors.darkMode.error : colors.lightMode.error,
  //     }}
  //   >
  //     {/* to match height of back view to the dynamic front view height,
  //     add random view below with same text (but invisable) to get same height */}
  //     <View>
  //       <Text style={sharedStyles.hiddenBackText}>{data.item.text}</Text>
  //     </View>
  //     <TouchableOpacity
  //       style={[useTheme('backRightBtn'), useTheme('backRightBtnRight')]}
  //       onPress={() => handleThoughtStatusChange(data.item.id, rowMap, data.item.key)}
  //     >
  //       <MaterialCommunityIcons name="checkbox-marked-outline" size={25} color="white" />
  //     </TouchableOpacity>

  //     <TouchableOpacity
  //       style={[useTheme('backRightBtn'), useTheme('backRightBtnLeft')]}
  //       onPress={() => handleThoughtDelete(data.item.id)}
  //     >
  //       <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
  //     </TouchableOpacity>
  //   </View>
  // );

  const renderModal = (thoughtId: string) => {
    setFocusedId(thoughtId);
    setMoreModalView(true);
  };

  // const renderItem = (data) => (
  //   // for slidables
  //   // thought is data.item.text
  //   <TouchableHighlight style={useTheme('rowFront')} underlayColor={'grey'}>
  //     <>
  //       <Text style={data.item.completed ? useTheme('textCompleted') : useTheme('text')}>{data.item.text}</Text>
  //       {data.item.tag ? (
  //         <TouchableOpacity style={sharedStyles.tagIcon} onPress={() => renderModal(data.item.key)}>
  //           {data.item.tag !== 'star' ? (
  //             <MaterialCommunityIcons name="tag" size={25} color={data.item.tag} />
  //           ) : (
  //             <MaterialCommunityIcons name="star" size={25} color="#D4AF37" />
  //           )}
  //         </TouchableOpacity>
  //       ) : (
  //         <></>
  //       )}
  //       <TouchableOpacity style={sharedStyles.moreBtn} onPress={() => renderModal(data.item.key)}>
  //         <MaterialIcons
  //           name="more-vert"
  //           size={35}
  //           color={theme ? colors.darkMode.primary : colors.lightMode.primary}
  //         />
  //       </TouchableOpacity>
  //     </>
  //   </TouchableHighlight>
  // );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainContainer>
          {thoughts.length ? (
            <ThoughtsList
              isDarkMode={isDarkMode}
              thoughts={thoughts}
              renderModal={renderModal}
              handleThoughtStatusChange={handleThoughtStatusChange}
              handleThoughtDelete={handleThoughtDelete}
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
        <FAB style={sharedStyles.fab} icon="plus" onPress={() => setAddThoughtModalView(true)} label="new thought" />
      </ThemeProvider>
    </>
  );
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const sharedStyles = StyleSheet.create({
  // styles not effected by light/dark mode
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
  hiddenBackText: {
    // see notes in code
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
  moreBtn: {
    position: 'absolute',
    right: 0,
  },
  tagIcon: {
    position: 'absolute',
    right: 30,
  },
});

const stylesDark = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: colors.darkMode.textOnSurface,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: `${colors.darkMode.textOnSurface}50`,
    fontSize: 20,
    flex: 1,
  },
  // === SwipeListView styles ===
  rowFront: {
    backgroundColor: colors.darkMode.dp1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  backRightBtn: {
    backgroundColor: 'pink',
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: colors.darkMode.error,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    right: 50,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: colors.darkMode.secondary,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

// ============================================================================

const stylesLight = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: colors.lightMode.textOnSurface,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: `${colors.lightMode.textOnSurface}50`,
    fontSize: 20,
    flex: 1,
  },
  // === SwipeListView styles ===
  rowFront: {
    backgroundColor: colors.lightMode.background,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    // shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: colors.lightMode.error,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    right: 50,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: colors.lightMode.secondary,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
