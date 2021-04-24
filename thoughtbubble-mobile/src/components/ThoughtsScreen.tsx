import React, { useState, useLayoutEffect, FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../reducers/rootReducer'; // type
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { deleteThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { MoreModal } from './MoreModal';
import { ThoughtScreenProps } from '../interfaces/componentProps'; // type
import { colors } from '../constants/colors';
import { SortThoughtModal } from './SortThoughtModal';
import { AddThoughtModal } from './AddThoughtModal';
import { FAB } from 'react-native-paper';

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
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

  useLayoutEffect(() => {
    // adds the sort button to the stack header
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 30, marginBottom: 2 }} onPress={() => setSortModalView(true)}>
          <MaterialCommunityIcons
            name="sort-variant"
            size={40}
            color={theme ? colors.darkMode.primary : colors.lightMode.textOnPrimary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  const handleThoughtDelete = (thoughtId: string) => {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtStatusChange = (thoughtId: string) => {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
  };

  const closeRow = (rowMap, rowKey) => {
    // for slidables
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    // for slidables
    <View
      style={{
        ...useTheme('rowFront'),
        backgroundColor: theme ? colors.darkMode.primary : colors.lightMode.primaryVariant,
      }}
    >
      {/* to match height of back view to the dynamic front view height,
      add random view below with same text (but invisable) to get same height */}
      <View>
        <Text style={sharedStyles.hiddenBackText}>{data.item.text}</Text>
      </View>
      <TouchableOpacity
        style={[useTheme('backRightBtn'), useTheme('backRightBtnLeft')]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Ionicon name="close-circle-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[useTheme('backRightBtn'), useTheme('backRightBtnMid')]}
        onPress={() => handleThoughtStatusChange(data.item.id)}
      >
        <Ionicon name="checkbox-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[useTheme('backRightBtn'), useTheme('backRightBtnRight')]}
        onPress={() => handleThoughtDelete(data.item.id)}
      >
        <Ionicon name="trash-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderModal = (thoughtId: string) => {
    setFocusedId(thoughtId); // working
    setMoreModalView(true);
  };

  const renderItem = (data) => (
    // for slidables
    // thought is data.item.text
    <TouchableHighlight style={useTheme('rowFront')} underlayColor={'grey'}>
      <>
        <Text style={data.item.completed ? useTheme('textCompleted') : useTheme('text')}>{data.item.text}</Text>
        {data.item.tag ? (
          <TouchableOpacity style={sharedStyles.tagIcon} onPress={() => renderModal(data.item.key)}>
            <MaterialIcons name="star" size={25} color={data.item.tag} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity style={sharedStyles.moreBtn} onPress={() => renderModal(data.item.key)}>
          <MaterialIcons
            name="more-vert"
            size={35}
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
          />
        </TouchableOpacity>
      </>
    </TouchableHighlight>
  );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      <View style={useTheme('mainContainer')}>
        <SwipeListView
          data={thoughts.map((i) => ({ ...i, key: i.id }))} // swipeviewlist api requires key prop
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          recalculateHiddenLayout
          disableRightSwipe
          closeOnScroll
          closeOnRowBeginSwipe
          closeOnRowPress
          rightOpenValue={-150}
          previewOpenValue={-40}
        />
      </View>
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
    </>
  );
};

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
  mainContainer: {
    flex: 1,
    backgroundColor: colors.darkMode.background,
  },
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
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    // backgroundColor: 'rgb(0, 122, 255)',
    backgroundColor: colors.darkMode.primary, // 'rgb(0, 122, 255)', // ios light blue
    right: 100,
  },
  backRightBtnMid: {
    // backgroundColor: 'rgb(52, 199, 89)',
    backgroundColor: colors.darkMode.secondary, // 'rgb(52, 199, 89)', // ios light green
    right: 50,
  },
  backRightBtnRight: {
    // backgroundColor: 'rgb(255, 59, 48)',
    backgroundColor: colors.darkMode.error, // 'rgb(255, 59, 48)', // ios light red
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

// ============================================================================

const stylesLight = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightMode.background,
  },
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
    // backgroundColor: 'rgb(0, 122, 255)',
    backgroundColor: colors.lightMode.primaryVariant, // 'rgb(0, 122, 255)', // ios light blue
    right: 100,
  },
  backRightBtnMid: {
    // backgroundColor: 'rgb(52, 199, 89)',
    backgroundColor: colors.lightMode.secondary, // 'rgb(52, 199, 89)', // ios light green
    right: 50,
  },
  backRightBtnRight: {
    // backgroundColor: 'rgb(255, 59, 48)',
    backgroundColor: colors.lightMode.error, // 'rgb(255, 59, 48)', // ios light red
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
