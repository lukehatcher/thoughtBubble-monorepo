import React, { useState } from 'react';
import {
  View,
  ScrollView,
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
import { RouteProp } from '@react-navigation/native'; // type
import { StackParamList } from './ProjectsNavStack';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction, todoStatusChangeAction } from '../actions/todoActions';
import { RootState } from '../reducers/rootReducer'; // type
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';

interface TodosScreenProps {
  route: RouteProp<StackParamList, 'Todos'>;
}

export const TodosScreen: React.FC<TodosScreenProps> = ({ route }) => {
  const [modalView, setModalView] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { projectName } = route.params; // should be id being passed D:

  const selector = (state: RootState) =>
    state.userData.find((i) => i.projectName === projectName).todos;
  let todos = useSelector(selector); // retrive todos for the project we're on

  const handleTodoAddition = (todo: string) => {
    if (!todo) {
      Alert.alert('invalid input');
      return;
    }
    dispatch(addTodoAction(projectName, todo));
  };

  const handleTodoDelete = (todo: string) => {
    dispatch(deleteTodoAction(projectName, todo));
  };

  const handleTodoStatusChange = (todo: string) => {
    dispatch(todoStatusChangeAction(projectName, todo));
  };

  const closeRow = (rowMap, rowKey) => {
    // repeated via proj
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    <TouchableHighlight
      style={styles.rowFront}
      underlayColor={'#DDD'} // on press color
    >
      {/* <Text style={styles.text}>{data.item.text}</Text> */}
      <Text style={data.item.completed ? styles.textCompleted : styles.text}>{data.item.text}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowFront}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Ionicon name="close-circle-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnMid]}
        onPress={() => handleTodoStatusChange(data.item.text)}
      >
        <Ionicon name="checkbox-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleTodoDelete(data.item.text)}
      >
        <Ionicon name="trash-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      {/* =================== */}
      <View style={styles.container}>
        <SwipeListView
          data={todos.map((i) => ({ ...i, key: i._id.toString() }))} // swipeviewlist api requires key prop
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          closeOnScroll
          rightOpenValue={-150}
          previewOpenValue={-40}
        />
      </View>
      {/* ============ modal ============ */}
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
      <TouchableOpacity style={styles.plusBtnContainer} onPress={() => setModalView(true)}>
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color="#6200EE" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: 'rgb(199, 199, 204)',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontSize: 20,
    flex: 1,
    padding: 15,
  },
  plusBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  plusBtn: {
    shadowColor: '#000', // improve shadow
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.48,
    shadowRadius: 13.0,
    elevation: 24,
  },
  plusButton: {
    alignItems: 'center',
    padding: 15,
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
  }, // new ================
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  // rgb(142, 142, 147)
  // rgb(99, 99, 102) // top/bottom
  // rgb(72, 72, 74) // current
  // rgb(58, 58, 60)
  // rgb(44, 44, 46) // background
  // rgb(28, 28, 30)
  rowFront: {
    backgroundColor: '#303030',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
    // borderRadius: 10,
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
    backgroundColor: 'rgb(0, 122, 255)', // apple ios colors (light)
    right: 100,
  },
  backRightBtnMid: {
    backgroundColor: 'rgb(52, 199, 89)', // ios light green
    right: 50,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb(255, 59, 48)', // apple ios colors (light)
    right: 0,
  },
});
