import React, { useState, useLayoutEffect, FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RootState } from '../reducers/rootReducer'; // type
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { deleteThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { MoreModal } from './MoreModal';
import { ThoughtScreenProps } from '../interfaces/componentProps'; // type
import { colors } from '../constants/colors';
import { SortThoughtModal } from './SortThoughtModal';
import { AddThoughtModal } from './AddThoughtModal';

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
    <View style={{ ...styles.rowFront, backgroundColor: 'rgb(0, 122, 255)' }}>
      {/* to match height of back view to the dynamic front view height,
      add random view below with same text (but invisable) to get same height */}
      <View>
        <Text style={styles.hiddenBackText}>{data.item.text}</Text>
      </View>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Ionicon name="close-circle-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnMid]}
        onPress={() => handleThoughtStatusChange(data.item.id)}
      >
        <Ionicon name="checkbox-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
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
    <TouchableHighlight style={styles.rowFront} underlayColor={'grey'}>
      <>
        <Text style={data.item.completed ? styles.textCompleted : styles.text}>{data.item.text}</Text>
        <TouchableOpacity style={styles.moreBtn} onPress={() => renderModal(data.item.key)}>
          <MaterialIcons name="more-vert" size={35} color="rgb(199, 199, 204)" />
        </TouchableOpacity>
      </>
    </TouchableHighlight>
  );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      <View style={styles.container}>
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
      <TouchableOpacity style={styles.plusBtnContainer} onPress={() => setAddThoughtModalView(true)}>
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color={colors.darkMode.secondary} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtn: {
    position: 'absolute',
    right: 0,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: 'rgb(199, 199, 204)',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: 'grey',
    fontSize: 20,
    flex: 1,
  },
  plusBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  plusBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.48,
    shadowRadius: 13.0,
    elevation: 24,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  textInput: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
    color: 'white',
  },
  btn1: {
    backgroundColor: '#6200EE',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
  },
  btn2: {
    borderRadius: 15,
    borderColor: '#6200EE',
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
  }, // === SwipeListView styles ===
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  rowFront: {
    backgroundColor: '#303030',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    // shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5.46,
    elevation: 9,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
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
    backgroundColor: 'rgb(0, 122, 255)', // ios light blue
    right: 100,
  },
  backRightBtnMid: {
    backgroundColor: 'rgb(52, 199, 89)', // ios light green
    right: 50,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb(255, 59, 48)', // ios light red
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
