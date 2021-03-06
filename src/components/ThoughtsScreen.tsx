import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableHighlight,
  LogBox,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RouteProp } from '@react-navigation/native'; // type
import { StackNavigationProp } from '@react-navigation/stack'; // type
import { StackParamList } from './ProjectsNavStack'; // type
import { RootState } from '../reducers/rootReducer'; // type
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addTodoAction, deleteTodoAction, todoStatusChangeAction } from '../actions/todoActions';
import { filtertThoughtsAction } from '../actions/filterActions';
import { fetchDataAction } from '../actions/fetchDataAction';

interface TodosScreenProps {
  route: RouteProp<StackParamList, 'Thoughts'>;
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

export const ThoughtsScreen: React.FC<TodosScreenProps> = ({ route, navigation }) => {
  const [modalView, setModalView] = useState(false);
  const [sortModalView, setSortModalView] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { projectId } = route.params;
  const thoughtsSelector = (state: RootState) =>
    state.userData.find((proj) => proj._id === projectId).todos;
  let todos = useSelector(thoughtsSelector); // retrive todos for the project we're on

  const userSelector = (state: RootState) => state.storedUser.sub;
  const userSub = useSelector(userSelector);

  useLayoutEffect(() => {
    // adds the sort button to the stack header
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.sortIcon} onPress={() => setSortModalView(true)}>
          <MaterialCommunityIcons name="sort-variant" size={40} color="rgb(199, 199, 204)" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleTodoAddition = (todo: string) => {
    setInput('');
    if (!todo) {
      Alert.alert('invalid input');
      return;
    }
    dispatch(addTodoAction(projectId, todo));
  };

  const handleTodoDelete = (todoId: string) => {
    dispatch(deleteTodoAction(projectId, todoId));
  };

  const handleTodoStatusChange = (todoId: string) => {
    dispatch(todoStatusChangeAction(projectId, todoId));
  };

  const handleThoughtFilter = (typeOfFilter: string) => {
    if (typeOfFilter === 'all') dispatch(fetchDataAction(userSub));
    dispatch(filtertThoughtsAction(projectId, typeOfFilter));
  };

  const closeRow = (rowMap, rowKey) => {
    // for slidables
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    // for slidables
    <TouchableHighlight style={styles.rowFront} underlayColor={'grey'}>
      <>
        <Text style={data.item.completed ? styles.textCompleted : styles.text}>
          {data.item.text}
        </Text>
        <TouchableOpacity style={styles.moreBtn} onPress={() => console.log('more')}>
          <MaterialIcons name="more-vert" size={35} color="rgb(199, 199, 204)" />
        </TouchableOpacity>
      </>
    </TouchableHighlight>
  );

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
        onPress={() => handleTodoStatusChange(data.item._id)}
      >
        <Ionicon name="checkbox-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleTodoDelete(data.item._id)}
      >
        <Ionicon name="trash-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      <View style={styles.container}>
        <SwipeListView
          data={todos.map((i) => ({ ...i, key: i._id }))} // swipeviewlist api requires key prop
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
      {/* ======= + modal ======= */}
      <Modal animationType="slide" visible={modalView}>
        <View style={styles.modal}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="add a new thought..."
            multiline
            style={styles.textInput}
            keyboardAppearance="dark"
            placeholderTextColor="white"
          />
          <TouchableOpacity style={styles.btn1}>
            <Button
              title="submit"
              color="black"
              onPress={() => {
                setModalView(false);
                handleTodoAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Button
              title="cancel"
              color="white"
              onPress={() => {
                setModalView(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ======= sort modal ======= */}
      <Modal animationType="fade" presentationStyle="overFullScreen" visible={sortModalView}>
        <View style={styles.modal}>
          <Text style={styles.sortText}>filter by status</Text>
          <TouchableOpacity style={styles.btn2}>
            <Button
              color="white"
              title="completed"
              onPress={() => handleThoughtFilter('completed')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Button
              color="white"
              title="in progress"
              onPress={() => handleThoughtFilter('incomplete')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Button color="white" title="view all" onPress={() => handleThoughtFilter('all')} />
          </TouchableOpacity>
          <Text style={styles.sortText}>filter by color</Text>
          <Button color="red" title="close" onPress={() => setSortModalView(false)} />
        </View>
      </Modal>
      <TouchableOpacity style={styles.plusBtnContainer} onPress={() => setModalView(true)}>
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color="#6200EE" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
    // marginRight: 20,
    // backgroundColor: 'red',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    // backgroundColor: 'red',
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
  sortIcon: {
    marginRight: 30,
    marginBottom: 2,
  },
  sortText: {
    color: 'white',
  },
  // sortBtns: {
  //   backgroundColor
  // }
});
